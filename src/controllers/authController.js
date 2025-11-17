// src/controllers/authController.js

const prisma = require('../db/prisma');
// Untuk keamanan, Anda akan menggunakan library seperti 'bcrypt' untuk membandingkan password

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Email dan Password diperlukan.' });
    }

    try {
        // 1. Cari user di database berdasarkan email
        const user = await prisma.user.findUnique({
            where: { email: username },
            // Dalam kasus nyata, kita akan mengambil password hash di sini
        });

        if (!user) {
            // User tidak ditemukan (Email salah)
            return res.status(401).json({ error: 'Kredensial tidak valid (Email/Password salah).' });
        }
        
        // 2. MOCK PASSWORD CHECK (Hanya untuk tujuan pengujian cepat)
        // ASUMSI: Kita hanya cek jika password yang dikirim BUKAN '123456'
        // Anda harus mengganti ini dengan Bcrypt.compare()
        if (password !== '123456') { 
            // Jika password salah (Dalam nyata: Bcrypt.compare akan gagal)
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
        // 1. Hash Password (Wajib di aplikasi nyata)
        // const hashedPassword = await bcrypt.hash(password, 10);
        // Untuk tujuan pengujian awal, kita langsung menyimpan password:
        const userData = {
            email: email,
            name: name,
            // Dalam aplikasi nyata, Anda akan menyimpan hashedPassword, bukan password mentah
            // password: hashedPassword, 
        };

        // 2. Buat User Baru di Database Neon
        const newUser = await prisma.user.create({
            data: userData,
        });

        // 3. Respon Sukses
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