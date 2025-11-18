// src/controllers/authController.js (FIX: Tambahkan JWT Creation)

const prisma = require('../db/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // <-- BARU: Import jsonwebtoken

// Kunci rahasia untuk menandatangani JWT. Harusnya disimpan di .env
const JWT_SECRET = process.env.JWT_SECRET || 'ganti_dengan_kunci_rahasia_anda'; 

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Email dan Password diperlukan.' });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: username },
        });

        if (!user) {
            return res.status(401).json({ error: 'Kredensial tidak valid (Email/Password salah).' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Kredensial tidak valid (Email/Password salah).' });
        }

        // --- BARU: Buat JWT ---
        const token = jwt.sign(
            { userId: user.id, email: user.email }, 
            JWT_SECRET, 
            { expiresIn: '1d' } // Token berlaku 1 hari
        );

        // 3. Login Berhasil (Kirim Token dan Data User)
        return res.json({ 
            message: 'Login berhasil!', 
            token: token, // <-- KIRIM TOKEN
            userId: user.id,
            name: user.name 
        });

    } catch (error) {
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
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            email: email,
            name: name,
            password: hashedPassword, 
        };

        const newUser = await prisma.user.create({
            data: userData,
        });
        
        // --- BARU: Buat JWT setelah registrasi ---
        const token = jwt.sign(
            { userId: newUser.id, email: newUser.email }, 
            JWT_SECRET, 
            { expiresIn: '1d' }
        );

        // 4. Respon Sukses
        res.status(201).json({ 
            message: 'Registrasi berhasil!', 
            token: token, // <-- KIRIM TOKEN
            userId: newUser.id,
            name: newUser.name 
        });

    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'Email ini sudah terdaftar. Silakan gunakan yang lain.' });
        }
        
        console.error('Error saat proses registrasi:', error);
        res.status(500).json({ 
            error: `Registrasi gagal. Kemungkinan database down/timeout. Error code: ${error.code || 'UNKNOWN'}`,
            detail: error.message
        });
    }
};