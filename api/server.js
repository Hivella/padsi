// api/server.js (Final Fix: Menambahkan Route untuk register.html)

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
// 1. Rute Halaman Utama: Express akan menyajikan login.html sebagai respons terhadap /
app.get('/', (req, res) => {
    res.sendFile(path.join(rootDir, 'login.html'));
});

// 2. Rute Register (BARU DITAMBAHKAN)
// Merespons GET /register.html (atau rute lain yang mengarah ke form registrasi)
app.get('/register.html', (req, res) => {
    res.sendFile(path.join(rootDir, 'register.html'));
});

// 3. Rute Dashboard (Blank Page)
app.get('/blank.html', (req, res) => {
    res.sendFile(path.join(rootDir, 'blank.html'));
});

// 4. Rute API
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);


// --- E. START SERVER (Untuk Development Lokal) ---
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

module.exports = app; // Export app untuk Vercel