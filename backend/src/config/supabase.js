import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

// Public client — uses anon key, respects RLS
export const supabase = createClient(env.supabaseUrl, env.supabaseAnonKey);

// Admin client — uses service role key, bypasses RLS
// Only use this for trusted server-side operations (admin routes, triggers)
export const supabaseAdmin = createClient(
  env.supabaseUrl,
  env.supabaseServiceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
