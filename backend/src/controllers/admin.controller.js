import { supabaseAdmin } from '../config/supabase.js';

export async function getAllTeams(req, res) {
  const { data: teams, error } = await supabaseAdmin
    .from('teams')
    .select(`
      *,
      team_members(*),
      users!teams_key_contact_id_fkey(email, role)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Admin getAllTeams error:', error);
    return res.status(500).json({ error: 'Failed to fetch teams' });
  }

  // Attach submission counts per team
  const teamIds = teams.map((t) => t.id);
  const { data: subCounts } = await supabaseAdmin
    .from('submissions')
    .select('team_id')
    .in('team_id', teamIds);

  const countMap = {};
  (subCounts || []).forEach(({ team_id }) => {
    countMap[team_id] = (countMap[team_id] || 0) + 1;
  });

  const result = teams.map((t) => ({
    ...t,
    submission_count: countMap[t.id] || 0,
  }));

  return res.json({ teams: result });
}

export async function updateTeamEligibility(req, res) {
  const { id } = req.params;
  const { is_eligible } = req.body;

  if (typeof is_eligible !== 'boolean') {
    return res.status(400).json({ error: 'is_eligible must be a boolean' });
  }

  const { data, error } = await supabaseAdmin
    .from('teams')
    .update({ is_eligible })
    .eq('id', id)
    .select()
    .single();

  if (error || !data) {
    return res.status(404).json({ error: 'Team not found or update failed' });
  }

  return res.json({ team: data });
}

export async function getDashboardStats(req, res) {
  const [teamsResult, submissionsResult] = await Promise.all([
    supabaseAdmin.from('teams').select('id, pathway, is_eligible, created_at'),
    supabaseAdmin.from('submissions').select('id, type, submitted_at'),
  ]);

  if (teamsResult.error || submissionsResult.error) {
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }

  const teams = teamsResult.data;
  const submissions = submissionsResult.data;

  const stats = {
    total_teams: teams.length,
    startup_teams: teams.filter((t) => t.pathway === 'startup').length,
    vc_teams: teams.filter((t) => t.pathway === 'vc').length,
    eligible_teams: teams.filter((t) => t.is_eligible).length,
    total_submissions: submissions.length,
    submissions_by_type: {},
    registrations_by_day: {},
  };

  submissions.forEach(({ type }) => {
    stats.submissions_by_type[type] = (stats.submissions_by_type[type] || 0) + 1;
  });

  teams.forEach(({ created_at }) => {
    const day = created_at.split('T')[0];
    stats.registrations_by_day[day] = (stats.registrations_by_day[day] || 0) + 1;
  });

  return res.json({ stats });
}

export async function getTeamSubmissions(req, res) {
  const { id } = req.params;

  const { data: submissions, error } = await supabaseAdmin
    .from('submissions')
    .select('*')
    .eq('team_id', id)
    .order('submitted_at', { ascending: false });

  if (error) {
    return res.status(500).json({ error: 'Failed to fetch submissions' });
  }

  return res.json({ submissions });
}
