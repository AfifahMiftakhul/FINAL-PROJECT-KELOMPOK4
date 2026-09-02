const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');
const config = require('../config/env');

// Controller untuk Registrasi User Baru
const register = async (req, res) => {
  try {
    const { nama, email, password } = req.body;

    // Validasi input dasar
    if (!nama || !email || !password) {
      return res.status(400).json({ error: 'Nama, email, dan password wajib diisi!' });
    }

    // Cek apakah email sudah terdaftar di database
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (existingUser) {
      return res.status(400).json({ error: 'Email sudah terdaftar gunakan email lain.' });
    }

    // Hash password menggunakan bcrypt (standar keamanan PRD)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Simpan user baru ke Supabase
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([{ nama, email, password: hashedPassword }])
      .select('id, nama, email, created_at')
      .single();

    if (insertError) {
      return res.status(500).json({ error: insertError.message });
    }

    return res.status(201).json({
      message: 'Registrasi berhasil!',
      user: newUser
    });
  } catch (err) {
    return res.status(500).json({ error: 'Terjadi kesalahan pada server: ' + err.message });
  }
};

// Controller untuk Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email dan password wajib diisi!' });
    }

    // Cari user berdasarkan email di Supabase
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (fetchError || !user) {
      return res.status(401).json({ error: 'Email atau password salah!' });
    }

    // Verifikasi password dengan bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Email atau password salah!' });
    }

    // Buat token JWT untuk sesi pengguna
    const tokenPayload = { id: user.id, email: user.email, nama: user.nama };
    const token = jwt.sign(tokenPayload, config.jwtSecret, { expiresIn: '1d' });

    return res.status(200).json({
      message: 'Login berhasil!',
      token,
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email
      }
    });
  } catch (err) {
    return res.status(500).json({ error: 'Terjadi kesalahan pada server: ' + err.message });
  }
};

module.exports = {
  register,
  login
};