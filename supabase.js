// Called after the Supabase CDN script loads in each HTML file
window._initSupabase = function() {
  const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co'
  const SUPABASE_ANON_KEY = 'YOUR_ANON_PUBLIC_KEY'
  window._sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}
