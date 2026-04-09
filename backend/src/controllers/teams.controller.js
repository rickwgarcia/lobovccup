import { supabaseAdmin } from '../config/supabase.js';
import { validateUnmEmail } from '../middleware/validate.middleware.js';
import { sendRegistrationConfirmation } from '../services/email.service.js';

export async function createTeam(req, res) {
  const { name, pathway, idea_description, members } = req.body;
  const userId = req.user.id;

  if (!name || !pathway) {
    return res.status(400).json({ error: 'Team name and pathway are required' });
  }
  if (!['startup', 'vc'].includes(pathway)) {
    return res.status(400).json({ error: 'Pathway must be "startup" or "vc"' });
  }
  if (pathway === 'startup' && !idea_description) {
    return res.status(400).json({ error: 'Idea description is required for startup teams' });
  }

  // Validate member emails
  if (members && Array.isArray(members)) {
    for (const m of members) {
      if (!m.name || !m.email) {
        return res.status(400).json({ error: 'Each member must have a name and email' });
      }
      if (!validateUnmEmail(m.email)) {
        return res.status(400).json({
          error: `Member email ${m.email} must be a @unm.edu address`,
        });
      }
    }
  }

  // Check if user already has a team
  const { data: existing } = await supabaseAdmin
    .from('teams')
    .select('id')
    .eq('key_contact_id', userId)
    .single();

  if (existing) {
    return res.status(409).json({ error: 'You are already registered with a team' });
  }

  // Insert team
  const { data: team, error: teamError } = await supabaseAdmin
    .from('teams')
    .insert({
      name: name.trim(),
      pathway,
      idea_description: idea_description?.trim() || null,
      key_contact_id: userId,
    })
    .select()
    .single();

  if (teamError) {
    console.error('Team insert error:', teamError);
    return res.status(500).json({ error: 'Failed to create team' });
  }

  // Update user role to match pathway
  await supabaseAdmin
    .from('users')
    .update({ role: pathway === 'vc' ? 'vc' : 'founder' })
    .eq('id', userId);

  // Insert team members
  if (members && members.length > 0) {
    const memberRows = members.map((m) => ({
      team_id: team.id,
      name: m.name.trim(),
      email: m.email.trim().toLowerCase(),
    }));

    const { error: memberError } = await supabaseAdmin
      .from('team_members')
      .insert(memberRows);

    if (memberError) {
      console.error('Members insert error:', memberError);
      // Team was created — return success but note the members issue
      return res.status(201).json({
        team,
        warning: 'Team created but some member records failed to save. Contact support.',
      });
    }
  }

  // Send confirmation email (non-blocking)
  sendRegistrationConfirmation({
    toEmail: req.user.email,
    teamName: team.name,
    pathway: team.pathway,
  }).catch((err) => console.warn('Registration email failed:', err.message));

  return res.status(201).json({ team });
}

export async function getMyTeam(req, res) {
  const userId = req.user.id;

  const { data: team, error } = await supabaseAdmin
    .from('teams')
    .select(`*, team_members(*)`)
    .eq('key_contact_id', userId)
    .single();

  if (error || !team) {
    return res.status(404).json({ error: 'No team found for this user' });
  }

  return res.json({ team });
}

export async function getAllTeams(req, res) {
  const { data: teams, error } = await supabaseAdmin
    .from('teams')
    .select(`*, team_members(*)`)
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(500).json({ error: 'Failed to fetch teams' });
  }

  return res.json({ teams });
}
