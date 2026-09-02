const jwt = require('jsonwebtoken');
const config = require('../config/env');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  // Format token umumnya: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Akses ditolak! Token autentikasi tidak ditemukan.' });
  }

  try {
    const verified = jwt.verify(token, config.jwtSecret);
    req.user = verified; // Menyimpan data user (id, email, nama) ke request
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token tidak valid atau sudah kedaluwarsa.' });
  }
};

module.exports = verifyToken;