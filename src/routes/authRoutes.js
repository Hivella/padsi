// src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Endpoint POST untuk proses Login
// Path: /auth/login
router.post('/login', authController.login);

// Endpoint POST untuk proses Registrasi
router.post('/register', authController.register); // <--- BARU

module.exports = router;