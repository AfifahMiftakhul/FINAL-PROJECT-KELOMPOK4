const express = require('express');

const router = express.Router();

const eventController = require('../controllers/eventController');

const verifyToken = require('../middleware/authMiddleware');

// Public: semua orang dapat melihat semua event tanpa login
router.get('/public', eventController.getPublicEvents);

// Admin: melihat event milik sendiri
router.get('/', verifyToken, eventController.getEvents);

// Admin: melihat event milik sendiri
router.get('/my-events', verifyToken, eventController.getMyEvents);

// Admin: menambah event
router.post('/', verifyToken, eventController.createEvent);

// Admin: mengedit event milik sendiri
router.put('/:id', verifyToken, eventController.updateEvent);

// Admin: menghapus event milik sendiri
router.delete('/:id', verifyToken, eventController.deleteEvent);

module.exports = router;