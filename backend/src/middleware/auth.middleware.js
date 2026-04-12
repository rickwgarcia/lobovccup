import { supabaseAdmin } from '../config/supabase.js';

// Validates the Bearer JWT from the Authorization header using Supabase.
// Attaches req.user (Supabase auth user) and req.userProfile (public.users row).
export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });
  }

  const token = authHeader.slice(7);

  try {
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !data.user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Fetch the user profile row (role, etc.)
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError || !profile) {
      // Profile row missing — create it now (handles users registered before fix)
      const { data: newProfile, error: insertError } = await supabaseAdmin
        .from('users')
        .upsert({ id: data.user.id, email: data.user.email, role: 'founder' })
        .select()
        .single();

      if (insertError || !newProfile) {
        return res.status(401).json({ error: 'User profile not found' });
      }

      req.user = data.user;
      req.userProfile = newProfile;
      return next();
    }

    req.user = data.user;
    req.userProfile = profile;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(500).json({ error: 'Authentication error' });
  }
}
