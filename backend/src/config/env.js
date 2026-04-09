import 'dotenv/config';

const required = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  port: parseInt(process.env.PORT || '3000', 10),
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
  resendApiKey: process.env.RESEND_API_KEY || null,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  isDev: process.env.NODE_ENV !== 'production',
};
