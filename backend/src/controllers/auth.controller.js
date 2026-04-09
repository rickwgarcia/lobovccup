import { supabase, supabaseAdmin } from '../config/supabase.js';
import { validateUnmEmail } from '../middleware/validate.middleware.js';

export async function signup(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  if (!validateUnmEmail(email)) {
    return res.status(400).json({ error: 'Only @unm.edu email addresses are allowed' });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json({
    message: 'Account created. Check your email to confirm your address.',
    user: { id: data.user?.id, email: data.user?.email },
  });
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Fetch user profile for role
  const { data: profile } = await supabaseAdmin
    .from('users')
    .select('role')
    .eq('id', data.user.id)
    .single();

  return res.json({
    token: data.session.access_token,
    user: {
      id: data.user.id,
      email: data.user.email,
      role: profile?.role || 'founder',
    },
  });
}

export async function logout(req, res) {
  // JWT is stateless — client discards the token.
  // If you want server-side invalidation, use Supabase's signOut with the user's JWT.
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    // Create a client scoped to the user's JWT and sign them out
    const { error } = await supabase.auth.admin?.signOut(token).catch(() => ({}));
    if (error) console.warn('Logout warning:', error.message);
  }
  return res.json({ message: 'Logged out' });
}

export async function getMe(req, res) {
  return res.json({
    id: req.user.id,
    email: req.user.email,
    role: req.userProfile.role,
  });
}
