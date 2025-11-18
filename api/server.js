// api/server.js (FINAL FIX: EXPRESS STATIC HANDLING)

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
const rootDir = path.join(__dirname, '..');

// Express akan mencari file statis (CSS/JS/PNG) di root directory
app.use(express.static(rootDir));


// --- D. DEFINISI ROUTE ---
// 1. Rute Halaman Utama: Express akan menyajikan login.html sebagai respons terhadap /
app.get('/', (req, res) => {
    // Karena kita sudah menambahkan express.static(rootDir), 
    // Express akan mencari index.html secara default.
    // Jika tidak ada index.html, kita arahkan ke login.html.
    res.sendFile('login.html', { root: rootDir });
});

// 2. Rute API
app.use('/users', userRoutes); 
app.use('/projects', projectRoutes);
app.use('/auth', authRoutes);


// --- E. MENJALANKAN SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});

module.exports = app;