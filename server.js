// server.js (DIPERBARUI UNTUK VERCEL)

// --- A. DEKLARASI & IMPORT ---
const express = require('express');
const cors = require('cors');
const path = require('path'); // <--- TAMBAHKAN INI

const userRoutes = require('./src/routes/userRoutes'); 
const projectRoutes = require('./src/routes/projectRoutes'); 
const authRoutes = require('./src/routes/authRoutes'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


// --- B. MIDDLEWARE GLOBAL ---
app.use(cors());
app.use(express.json());

// --- C. MENYAJIKAN FILE STATIS (BARU) ---
// Perintahkan Express untuk menyajikan file apa pun (html, css, js) 
// dari direktori root tempat server ini berjalan.
app.use(express.static(path.join(__dirname)));

// --- D. DEFINISI ROUTE API ---

// HAPUS RUTE LAMA INI:
// app.get('/', (req, res) => {
//     res.send('API Express.js Berjalan!');
// });
// (express.static sekarang akan otomatis menyajikan index.html atau login.html)

// 1. Rute untuk Manajemen User (CRUD)
app.use('/users', userRoutes); 

// 2. Rute untuk Manajemen Project (CRUD)
app.use('/projects', projectRoutes);

// 3. Rute untuk Otentikasi (Login/Signup)
app.use('/auth', authRoutes); 


// --- E. MENJALANKAN SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});