import { supabaseAdmin } from '../config/supabase.js';
import { uploadFile, deleteFile, getSignedUrl } from '../services/storage.service.js';

const DEFAULT_BUCKET = 'task-submissions';

// POST /api/task-submissions/upload
export async function uploadTaskSubmission(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { task_id, company_name, notes } = req.body;
  if (!task_id) {
    return res.status(400).json({ error: 'task_id is required' });
  }

  // Fetch the task
  const { data: task, error: taskError } = await supabaseAdmin
    .from('tasks')
    .select('*')
    .eq('id', task_id)
    .single();

  if (taskError || !task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  // Fetch user's team
  const { data: team, error: teamError } = await supabaseAdmin
    .from('teams')
    .select('id, pathway, name')
    .eq('key_contact_id', req.user.id)
    .single();

  if (teamError || !team) {
    return res.status(404).json({ error: 'You must be registered with a team to submit files' });
  }

  // Verify the task applies to this team's track
  if (task.track !== 'all' && task.track !== team.pathway) {
    return res.status(403).json({ error: 'This task is not available for your track' });
  }

  // Enforce file size
  const maxBytes = (task.max_file_size_mb || 50) * 1024 * 1024;
  if (req.file.size > maxBytes) {
    return res.status(400).json({
      error: `File too large. Max size: ${task.max_file_size_mb || 50} MB`,
    });
  }

  // Enforce allowed file types if specified
  if (task.allowed_file_types && task.allowed_file_types.length > 0) {
    if (!task.allowed_file_types.includes(req.file.mimetype)) {
      return res.status(400).json({
        error: `File type not allowed. Accepted types: ${task.allowed_file_types.join(', ')}`,
      });
    }
  }

  const bucket = task.storage_bucket || DEFAULT_BUCKET;

  // Build path: {team_id}/{task_id}/{timestamp}_{filename}
  const timestamp = Date.now();
  const safeName = req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storagePath = `${team.id}/${task_id}/${timestamp}_${safeName}`;

  // Upload to Supabase Storage
  let uploadedPath;
  try {
    const { data, error: uploadError } = await supabaseAdmin.storage
      .from(bucket)
      .upload(storagePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });

    if (uploadError) throw new Error(uploadError.message);
    uploadedPath = data.path;
  } catch (err) {
    console.error('Storage upload error:', err);
    return res.status(500).json({ error: 'File upload failed' });
  }

  // Check for existing submission (task_id + team_id is UNIQUE)
  const { data: existing } = await supabaseAdmin
    .from('task_submissions')
    .select('id, file_url')
    .eq('task_id', task_id)
    .eq('team_id', team.id)
    .maybeSingle();

  let submission;

  if (existing) {
    // Delete old file from storage (non-blocking)
    if (existing.file_url) {
      deleteFile(bucket, existing.file_url).catch(() => {});
    }

    const { data, error } = await supabaseAdmin
      .from('task_submissions')
      .update({
        file_url: uploadedPath,
        file_name: req.file.originalname,
        file_size: req.file.size,
        company_name: company_name || null,
        notes: notes || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existing.id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to update submission record' });
    }
    submission = data;
  } else {
    const { data, error } = await supabaseAdmin
      .from('task_submissions')
      .insert({
        task_id,
        team_id: team.id,
        file_url: uploadedPath,
        file_name: req.file.originalname,
        file_size: req.file.size,
        company_name: company_name || null,
        notes: notes || null,
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to save submission record' });
    }
    submission = data;
  }

  return res.status(existing ? 200 : 201).json({ submission });
}

// GET /api/task-submissions/me
// Returns all task submissions for the current user's team, joined with task info
export async function getMyTaskSubmissions(req, res) {
  const { data: team } = await supabaseAdmin
    .from('teams')
    .select('id')
    .eq('key_contact_id', req.user.id)
    .single();

  if (!team) {
    return res.json({ submissions: [] });
  }

  const { data: submissions, error } = await supabaseAdmin
    .from('task_submissions')
    .select(`*, tasks(id, title, description, due_date, track, requires_file)`)
    .eq('team_id', team.id)
    .order('submitted_at', { ascending: false });

  if (error) {
    return res.status(500).json({ error: 'Failed to fetch submissions' });
  }

  return res.json({ submissions });
}

// GET /api/task-submissions/task/:taskId  (admin only)
export async function getSubmissionsForTask(req, res) {
  const { taskId } = req.params;

  const { data: submissions, error } = await supabaseAdmin
    .from('task_submissions')
    .select(`*, teams(id, name, pathway, users:key_contact_id(email))`)
    .eq('task_id', taskId)
    .order('submitted_at', { ascending: false });

  if (error) {
    return res.status(500).json({ error: 'Failed to fetch submissions' });
  }

  return res.json({ submissions });
}

// GET /api/task-submissions/download/:id
export async function getDownloadUrl(req, res) {
  const { id } = req.params;

  const { data: submission, error } = await supabaseAdmin
    .from('task_submissions')
    .select(`*, tasks(storage_bucket)`)
    .eq('id', id)
    .single();

  if (error || !submission) {
    return res.status(404).json({ error: 'Submission not found' });
  }

  // Verify access: own team or admin
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

  const bucket = submission.tasks?.storage_bucket || DEFAULT_BUCKET;

  try {
    const signedUrl = await getSignedUrl(bucket, submission.file_url, 300);
    return res.json({ url: signedUrl, expiresIn: 300 });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to generate download URL' });
  }
}
