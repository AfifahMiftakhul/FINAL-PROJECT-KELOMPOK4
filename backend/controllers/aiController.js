const { GoogleGenAI } = require('@google/genai');
const config = require('../config/env');

const generateEventDescription = async (req, res) => {
  try {
    const { nama_event, kategori, tanggal, waktu, lokasi, info_pendaftaran, gaya_bahasa } = req.body;

    // Validasi input dasar
    if (!nama_event || !kategori || !gaya_bahasa) {
      return res.status(400).json({ error: 'Nama event, kategori, dan gaya bahasa wajib diisi!' });
    }

    // Pastikan API Key ada
    const apiKey = config.geminiApiKey || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('❌ GEMINI_API_KEY belum disetel di file .env');
      return res.status(500).json({ error: 'Konfigurasi API Key Gemini belum diatur di server.' });
    }

    // Inisialisasi client Google Gen AI
    const ai = new GoogleGenAI({ apiKey });

    // Susun prompt yang jelas untuk Gemini
    const prompt = `
Buatkan draf deskripsi event yang menarik, profesional, dan siap dipublikasikan untuk acara berikut:
- Nama Event: ${nama_event}
- Kategori: ${kategori}
- Tanggal: ${tanggal || 'Segera'}
- Waktu: ${waktu || 'Menyesuaikan'}
- Lokasi: ${lokasi || 'Online / Hybrid'}
- Informasi Pendaftaran: ${info_pendaftaran || 'Hubungi panitia'}
- Gaya Bahasa / Tone: ${gaya_bahasa}

Berikan hasil deskripsi yang terstruktur dengan paragraf pembuka yang menarik, detail acara, serta Call to Action (CTA) untuk pendaftaran. Tanpa teks pengantar tambahan, langsung berikan hasil deskripsinya saja.
    `.trim();

    // Panggil model gemini-3.6-flash sesuai rekomendasi error terbaru
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    const description = response.text;

    if (!description) {
      return res.status(500).json({ error: 'Gagal menghasilkan deskripsi dari Gemini AI.' });
    }

    return res.status(200).json({
      message: 'Deskripsi event berhasil digenerate!',
      deskripsi: description
    });
  } catch (err) {
    console.error('❌ Error AI Controller:', err);
    return res.status(500).json({ error: 'Terjadi kesalahan pada AI server: ' + err.message });
  }
};

module.exports = {
  generateEventDescription
};