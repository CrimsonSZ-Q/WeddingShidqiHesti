// ping.js
(async () => {
  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
      throw new Error('Secret GitHub tidak terbaca! Periksa kembali Settings > Secrets.');
    }

    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    
    const { data, error } = await supabase.from('rsvps').select('*').limit(1);
    
    if (error) throw error;
    console.log('Ping berhasil! Supabase tetap aktif.');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
