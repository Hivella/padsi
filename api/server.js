// api/server.js (Perbaikan Penanganan File Statis Vercel)

// --- A. DEKLARASI & IMPORT ---
const express = require('express');
const cors = require('cors');
const path = require('path'); // PENTING: Untuk penanganan path statis

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
// Ini adalah path ke folder proyek utama yang berisi login.html, style.css, dll.
const rootDir = path.join(__dirname, '..');

// Express akan mencari semua file statis (CSS/JS/PNG/HTML) di root directory.
app.use(express.static(rootDir));


// --- D. DEFINISI ROUTE ---
// 1. Rute Halaman Utama: Express akan menyajikan login.html sebagai respons terhadap /
app.get('/', (req, res) => {
    // Menggunakan path.join() untuk memastikan path absolut yang benar
    // untuk login.html di lingkungan serverless.
    res.sendFile(path.join(rootDir, 'login.html'));
});

// 2. Rute API
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);


// --- E. START SERVER (Untuk Development Lokal) ---
// Vercel akan menangani start server, namun kode ini diperlukan untuk menjalankan server secara lokal.
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});