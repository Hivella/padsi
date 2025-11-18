// api/server.js (FINAL & KOREKSI PATH)

// --- A. DEKLARASI & IMPORT ---
const express = require('express');
const cors = require('cors');

// PATH DIUBAH: DARI './src/routes' MENJADI '../src/routes'
const userRoutes = require('../src/routes/userRoutes'); 
const projectRoutes = require('./../src/routes/projectRoutes'); 
const authRoutes = require('../src/routes/authRoutes'); 
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3000;


// --- B. MIDDLEWARE GLOBAL ---
app.use(cors());
app.use(express.json());


// --- C. DEFINISI ROUTE ---
app.get('/', (req, res) => {
    // Pesan ini hanya untuk tes koneksi fungsi
    res.send('API Express.js Berjalan!'); 
});

// Rute API
app.use('/users', userRoutes); 
app.use('/projects', projectRoutes);
app.use('/auth', authRoutes);


// --- D. MENJALANKAN SERVER (HANYA LOKAL) ---
app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});

// --- E. EKSPOR APLIKASI UNTUK VERCEL (PENTING!) ---
module.exports = app;