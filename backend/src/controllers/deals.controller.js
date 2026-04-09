// Deal-specific routes are handled through the submissions controller
// (deal_memo, term_sheet, due_diligence, portfolio_summary types).
// This controller exists for any future deal-specific logic.

import { supabaseAdmin } from '../config/supabase.js';

// Get all deal submissions for the current VC team, grouped by company
export async function getDeals(req, res) {
  const userId = req.user.id;

  const { data: team } = await supabaseAdmin
    .from('teams')
    .select('id, pathway')
    .eq('key_contact_id', userId)
    .single();

  if (!team || team.pathway !== 'vc') {
    return res.status(403).json({ error: 'Only VC teams can access deal records' });
  }

  const { data: submissions, error } = await supabaseAdmin
    .from('submissions')
    .select('*')
    .eq('team_id', team.id)
    .in('type', ['deal_memo', 'term_sheet', 'due_diligence', 'portfolio_summary'])
    .order('company_name', { ascending: true });

  if (error) {
    return res.status(500).json({ error: 'Failed to fetch deal submissions' });
  }

  // Group by company_name for deal docs
  const grouped = {};
  for (const sub of submissions) {
    if (sub.type === 'portfolio_summary') {
      grouped['__portfolio__'] = grouped['__portfolio__'] || [];
      grouped['__portfolio__'].push(sub);
    } else {
      const key = sub.company_name || 'unknown';
      grouped[key] = grouped[key] || [];
      grouped[key].push(sub);
    }
  }

  return res.json({ deals: grouped });
}
