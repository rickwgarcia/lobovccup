import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

export const supabase = createClient(env.supabaseUrl, env.supabaseAnonKey);

// Alias — no service role key needed; RLS policies handle access control
export const supabaseAdmin = supabase;
