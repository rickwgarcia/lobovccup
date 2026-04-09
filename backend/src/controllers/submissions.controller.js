import { supabaseAdmin } from '../config/supabase.js';
import { SUBMISSION_TYPES } from '../config/storage.js';
import { uploadFile, deleteFile, getSignedUrl } from '../services/storage.service.js';
import { sendSubmissionConfirmation } from '../services/email.service.js';

export async function uploadSubmission(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { type, company_name } = req.body;
  const userId = req.user.id;

  // Validate submission type
  const config = SUBMISSION_TYPES[type];
  if (!config) {
    return res.status(400).json({ error: `Unknown submission type: ${type}` });
  }

  // Enforce file size limit per type
  if (req.file.size > config.maxSizeBytes) {
    return res.status(400).json({
      error: `File too large. Max size for ${config.label}: ${Math.round(config.maxSizeBytes / 1024 / 1024)} MB`,
    });
  }

  // Require company_name for per-investment docs
  if (config.requiresCompanyName && !company_name) {
    return res.status(400).json({ error: `company_name is required for ${config.label}` });
  }

  // Fetch user's team
  const { data: team, error: teamError } = await supabaseAdmin
    .from('teams')
    .select('id, pathway')
    .eq('key_contact_id', userId)
    .single();

  if (teamError || !team) {
    return res.status(404).json({ error: 'You must be registered with a team to submit files' });
  }

  // Enforce pathway-type match
  if (config.pathway && config.pathway !== team.pathway) {
    return res.status(403).json({
      error: `${config.label} is only available for ${config.pathway} teams`,
    });
  }

  // Upload to Supabase Storage
  let storagePath;
  try {
    const result = await uploadFile({
      bucket: config.bucket,
      teamId: team.id,
      originalName: req.file.originalname,
      buffer: req.file.buffer,
      mimeType: req.file.mimetype,
    });
    storagePath = result.path;
  } catch (err) {
    console.error('Storage upload error:', err);
    return res.status(500).json({ error: 'File upload failed' });
  }

  // Check for existing submission of same type (+company for per-investment docs)
  let existingQuery = supabaseAdmin
    .from('submissions')
    .select('id, file_url')
    .eq('team_id', team.id)
    .eq('type', type);

  if (config.requiresCompanyName && company_name) {
    existingQuery = existingQuery.eq('company_name', company_name);
  }

  const { data: existing } = await existingQuery.single();

  let submission;

  if (existing) {
    // Extract old path from file_url for cleanup
    const oldPath = extractPathFromUrl(existing.file_url);

    // Upsert submission record
    const { data, error } = await supabaseAdmin
      .from('submissions')
      .update({
        file_url: storagePath,
        file_name: req.file.originalname,
        file_size: req.file.size,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existing.id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to update submission record' });
    }
    submission = data;

    // Clean up old file asynchronously
    if (oldPath) {
      deleteFile(config.bucket, oldPath).catch(() => {});
    }
  } else {
    const { data, error } = await supabaseAdmin
      .from('submissions')
      .insert({
        team_id: team.id,
        type,
        file_url: storagePath,
        file_name: req.file.originalname,
        file_size: req.file.size,
        company_name: company_name || null,
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to save submission record' });
    }
    submission = data;
  }

  // Send confirmation email (non-blocking)
  sendSubmissionConfirmation({
    toEmail: req.user.email,
    teamName: team.name || 'your team',
    submissionType: config.label,
  }).catch(() => {});

  return res.status(existing ? 200 : 201).json({ submission });
}

export async function getMySubmissions(req, res) {
  const userId = req.user.id;

  const { data: team } = await supabaseAdmin
    .from('teams')
    .select('id')
    .eq('key_contact_id', userId)
    .single();

  if (!team) {
    return res.json({ submissions: [] });
  }

  const { data: submissions, error } = await supabaseAdmin
    .from('submissions')
    .select('*')
    .eq('team_id', team.id)
    .order('submitted_at', { ascending: false });

  if (error) {
    return res.status(500).json({ error: 'Failed to fetch submissions' });
  }

  return res.json({ submissions });
}

export async function getAllSubmissions(req, res) {
  const { data: submissions, error } = await supabaseAdmin
    .from('submissions')
    .select(`*, teams(name, pathway)`)
    .order('submitted_at', { ascending: false });

  if (error) {
    return res.status(500).json({ error: 'Failed to fetch submissions' });
  }

  return res.json({ submissions });
}

export async function getDownloadUrl(req, res) {
  const { id } = req.params;

  const { data: submission, error } = await supabaseAdmin
    .from('submissions')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !submission) {
    return res.status(404).json({ error: 'Submission not found' });
  }

  // Verify user owns this submission (or is admin)
  if (req.userProfile.role !== 'admin') {
    const { data: team } = await supabaseAdmin
      .from('teams')
      .select('id')
      .eq('id', submission.team_id)
      .eq('key_contact_id', req.user.id)
      .single();

    if (!team) {
      return res.status(403).json({ error: 'Access denied' });
    }
  }

  const config = SUBMISSION_TYPES[submission.type];
  if (!config) {
    return res.status(400).json({ error: 'Unknown submission type' });
  }

  try {
    const signedUrl = await getSignedUrl(config.bucket, submission.file_url, 300);
    return res.json({ url: signedUrl, expiresIn: 300 });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to generate download URL' });
  }
}

function extractPathFromUrl(fileUrl) {
  // fileUrl is stored as the storage path string, not a full URL
  return fileUrl;
}
