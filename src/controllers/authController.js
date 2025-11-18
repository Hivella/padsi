// src/controllers/authController.js (FIX: Detailed Error Logging)

const prisma = require('../db/prisma');
const bcrypt = require('bcryptjs');

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
            return res.status(401).json({ error: 'Kredensial tidak valid (Email/Password salah).' });
        }
        
        // 2. BANDINGKAN PASSWORD
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Kredensial tidak valid (Email/Password salah).' });
        }

        // 3. Login Berhasil
        return res.json({ 
            message: 'Login berhasil!', 
            userId: user.id,
            name: user.name 
        });

    } catch (error) {
        // Log error secara detail di konsol Vercel
        console.error('Error saat proses login:', error);
        res.status(500).json({ error: 'Terjadi kesalahan server saat login. Cek logs Vercel.' });
    }
};

exports.register = async (req, res) => {
    const { email, password, name } = req.body; 

    if (!email || !password || !name) {
        return res.status(400).json({ error: 'Email, Password, dan Nama harus diisi.' });
    }

    try {
        // 1. HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 2. Siapkan data untuk disimpan
        const userData = {
            email: email,
            name: name,
            password: hashedPassword, 
        };

        // 3. Buat User Baru
        const newUser = await prisma.user.create({
            data: userData,
        });

        // 4. Respon Sukses
        res.status(201).json({ 
            message: 'Registrasi berhasil!', 
            userId: newUser.id,
            name: newUser.name 
        });

    } catch (error) {
        // Pengecekan Error Prisma: Unique Constraint Violation
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'Email ini sudah terdaftar. Silakan gunakan yang lain.' });
        }
        
        // LOG ERROR PRISMA LAINNYA
        console.error('Error saat proses registrasi:', error);
        // Penting: Kirim pesan error yang lebih spesifik untuk diagnosis
        res.status(500).json({ 
            error: `Registrasi gagal. Kemungkinan database down/timeout. Error code: ${error.code || 'UNKNOWN'}`,
            detail: error.message
        });
    }
};