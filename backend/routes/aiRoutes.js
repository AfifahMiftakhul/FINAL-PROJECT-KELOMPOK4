const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const verifyToken = require('../middleware/authMiddleware');

// Endpoint AI disamakan menjadi /generate agar cocok dengan pemanggilan di frontend
router.post('/generate', verifyToken, aiController.generateEventDescription);

module.exports = router;