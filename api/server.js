// api/server.js (FINAL FIX: Menambahkan Route Eksplisit untuk File JS)

// --- A. DEKLARASI & IMPORT ---
const express = require('express');
const cors = require('cors');
const path = require('path'); 

const userRoutes = require('../src/routes/userRoutes'); 
const projectRoutes = require('../src/routes/projectRoutes'); 
const authRoutes = require('../src/routes/authRoutes'); 
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3000;


// --- B. MIDDLEWARE GLOBAL ---
app.use(cors());
app.use(express.json());

// --- C. MENYAJIKAN FILE STATIS (SOLUSI VERCEL) ---
// Tentukan root directory sebagai satu tingkat di atas folder 'api'
const rootDir = path.join(__dirname, '..');

// Express akan mencari semua file statis di root directory.
app.use(express.static(rootDir, { 
    maxAge: '1h', // Cache di browser selama 1 jam
}));


// --- D. DEFINISI ROUTE ---
// 1. Rute Halaman Utama & HTML Statis
app.get('/', (req, res) => {
    res.sendFile(path.join(rootDir, 'login.html'));
});

app.get('/register.html', (req, res) => {
    res.sendFile(path.join(rootDir, 'register.html'));
});

app.get('/blank.html', (req, res) => {
    res.sendFile(path.join(rootDir, 'blank.html'));
});

// 2. Rute Eksplisit untuk File JAVASCRIPT (PERBAIKAN 404)
app.get('/register.js', (req, res) => {
    res.sendFile(path.join(rootDir, 'register.js'));
});

app.get('/login-script.js', (req, res) => {
    res.sendFile(path.join(rootDir, 'login-script.js'));
});

// 3. Rute API
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);


// --- E. START SERVER (Untuk Development Lokal) ---
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

module.exports = app;