// src/controllers/authController.js

const prisma = require('../db/prisma');
const bcrypt = require('bcryptjs'); // <--- 1. IMPORT BCRYPTJS

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Email dan Password diperlukan.' });
    }

    try {
        // 1. Cari user di database berdasarkan email
        const user = await prisma.user.findUnique({
            where: { email: username },
        });

        if (!user) {
            // User tidak ditemukan (Email salah)
            // JANGAN beri tahu emailnya yang salah, tetap bilang "Kredensial tidak valid"
            return res.status(401).json({ error: 'Kredensial tidak valid (Email/Password salah).' });
        }
        
        // 2. BANDINGKAN PASSWORD (YANG ASLI)
        // Kita bandingkan password yang diinput (password) dengan hash di database (user.password)
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            // Jika password salah
            return res.status(401).json({ error: 'Kredensial tidak valid (Email/Password salah).' });
        }

        // 3. Login Berhasil
        return res.json({ 
            message: 'Login berhasil!', 
            userId: user.id,
            name: user.name 
        });

    } catch (error) {
        console.error('Error saat proses login:', error);
        res.status(500).json({ error: 'Terjadi kesalahan server saat login.' });
    }
};

exports.register = async (req, res) => {
    const { email, password, name } = req.body; 

    if (!email || !password || !name) {
        return res.status(400).json({ error: 'Email, Password, dan Nama harus diisi.' });
    }

    try {
        // 1. HASH PASSWORD (Wajib)
        // Kita "menggarami" (salt) passwordnya agar lebih aman
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 2. Siapkan data untuk disimpan
        const userData = {
            email: email,
            name: name,
            password: hashedPassword, // <--- 2. SIMPAN PASSWORD YANG SUDAH DI-HASH
        };

        // 3. Buat User Baru di Database Neon
        const newUser = await prisma.user.create({
            data: userData,
        });

        // 4. Respon Sukses (Jangan kirim password kembali)
        res.status(201).json({ 
            message: 'Registrasi berhasil!', 
            userId: newUser.id,
            name: newUser.name 
        });

    } catch (error) {
        // Pengecekan Error: Jika email sudah ada (Unique Constraint Violation)
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'Email ini sudah terdaftar. Silakan gunakan yang lain.' });
        }
        console.error('Error saat proses registrasi:', error);
        res.status(500).json({ error: 'Terjadi kesalahan server saat registrasi.' });
    }
};