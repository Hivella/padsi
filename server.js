// server.js (UTAMA & BERSIH)

// --- A. DEKLARASI & IMPORT ---
const express = require('express');
const cors = require('cors');

// Import SEMUA route
const userRoutes = require('./src/routes/userRoutes'); 
const projectRoutes = require('./src/routes/projectRoutes'); 
const authRoutes = require('./src/routes/authRoutes'); 
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3000;


// --- B. MIDDLEWARE GLOBAL ---
app.use(cors());
app.use(express.json()); // Mengizinkan server membaca body JSON


// --- C. DEFINISI ROUTE ---
app.get('/', (req, res) => {
    // Pesan ini yang Anda lihat saat Vercel berhasil
    res.send('API Express.js Berjalan!'); 
});

// 1. Rute untuk Manajemen User (CRUD)
app.use('/users', userRoutes); 

// 2. Rute untuk Manajemen Project (CRUD)
app.use('/projects', projectRoutes);

// 3. Rute untuk Otentikasi (Login/Signup)
app.use('/auth', authRoutes);


// --- D. MENJALANKAN SERVER ---
// Baris ini hanya berjalan di lokal (npm start)
app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});

// Baris ini PENTING untuk Vercel
module.exports = app;