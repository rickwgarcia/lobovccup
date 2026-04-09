// Called after the Supabase CDN script loads in each HTML file
window._initSupabase = function() {
  const SUPABASE_URL = 'https://wvehsyufxgfefcfnidhu.supabase.co'
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2ZWhzeXVmeGdmZWZjZm5pZGh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NDE5OTUsImV4cCI6MjA5MTMxNzk5NX0.TTw2cIfB19Z02TgJ4Eh2-R49yauxAvWu3H5ZNXXQF6s'
  window._sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}
