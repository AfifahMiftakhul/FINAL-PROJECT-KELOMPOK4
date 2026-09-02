const supabase = require('../config/supabase');

// 1. Ambil semua event milik user yang sedang login (bisa digunakan untuk getEvents maupun getMyEvents)
const getEvents = async (req, res) => {
  try {
    const userId = req.user.id; // Didapat dari token JWT authMiddleware

    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .eq('user_id', userId)
      .order('tanggal', { ascending: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Mengirimkan format ganda (events & data) agar kompatibel dengan berbagai frontend
    return res.status(200).json({ 
      message: 'Berhasil mengambil data event', 
      events: events,
      data: events 
    });
  } catch (err) {
    return res.status(500).json({ error: 'Terjadi kesalahan server: ' + err.message });
  }
};

// Alias khusus untuk rute /my-events agar terpanggil dengan benar
const getMyEvents = getEvents;

// Ambil semua event untuk pengguna umum (tanpa login)
const getPublicEvents = async (req, res) => {
  try {
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .order('tanggal', { ascending: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({
      message: 'Berhasil mengambil semua event',
      events: events,
      data: events
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Terjadi kesalahan server: ' + err.message
    });
  }
};

// 2. Tambah event baru
const createEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const { nama_event, kategori, tanggal, waktu, lokasi, info_pendaftaran, gaya_bahasa, deskripsi } = req.body;

    // Validasi field wajib
    if (!nama_event || !kategori || !tanggal || !waktu || !lokasi || !gaya_bahasa) {
      return res.status(400).json({ error: 'Semua kolom utama wajib diisi!' });
    }

    const { data: newEvent, error } = await supabase
      .from('events')
      .insert([
        {
          user_id: userId,
          nama_event,
          kategori,
          tanggal,
          waktu,
          lokasi,
          info_pendaftaran,
          gaya_bahasa,
          deskripsi
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ message: 'Event berhasil ditambahkan!', event: newEvent });
  } catch (err) {
    return res.status(500).json({ error: 'Terjadi kesalahan server: ' + err.message });
  }
};

// 3. Update event
const updateEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.id;
    const { nama_event, kategori, tanggal, waktu, lokasi, info_pendaftaran, gaya_bahasa, deskripsi } = req.body;

    // Pastikan event milik user yang bersangkutan
    const { data: updatedEvent, error } = await supabase
      .from('events')
      .update({
        nama_event,
        kategori,
        tanggal,
        waktu,
        lokasi,
        info_pendaftaran,
        gaya_bahasa,
        deskripsi,
        updated_at: new Date()
      })
      .eq('id', eventId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error || !updatedEvent) {
      return res.status(404).json({ error: 'Event tidak ditemukan atau gagal diubah.' });
    }

    return res.status(200).json({ message: 'Event berhasil diperbarui!', event: updatedEvent });
  } catch (err) {
    return res.status(500).json({ error: 'Terjadi kesalahan server: ' + err.message });
  }
};

// 4. Hapus event
const deleteEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.id;

    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', eventId)
      .eq('user_id', userId);

    if (error) {
      return res.status(404).json({ error: 'Event tidak ditemukan.' });
    }

    return res.status(200).json({ message: 'Event berhasil dihapus!' });
  } catch (err) {
    return res.status(500).json({ error: 'Terjadi kesalahan server: ' + err.message });
  }
};

module.exports = {
  getEvents,
  getMyEvents,
  getPublicEvents,
  createEvent,
  updateEvent,
  deleteEvent
};