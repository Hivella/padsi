// src/controllers/userController.js
const prisma = require('../db/prisma'); // Import Prisma Client

// Fungsi: Mengambil semua user dan projects (GET /users)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: { projects: true }, 
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Gagal mengambil data user.' });
    }
};

// Fungsi: Membuat user baru (POST /users)
exports.createUser = async (req, res) => {
    const { email, name } = req.body;

    if (!email || !name) {
        return res.status(400).json({ error: 'Email dan Nama harus disediakan.' });
    }

    try {
        const newUser = await prisma.user.create({
            data: { email, name },
        });
        res.status(201).json(newUser);
    } catch (error) {
        // Error 500 biasanya karena email sudah ada (UNIQUE constraint)
        res.status(500).json({ error: 'Gagal membuat user baru atau email sudah digunakan.' });
    }
};
// (Anda bisa menambahkan delete/update di sini)

// Fungsi: Memperbarui user berdasarkan ID (PUT /users/:id)
exports.updateUser = async (req, res) => {
    // Ambil ID dari URL (params) dan data dari body
    const { id } = req.params;
    const { email, name } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) }, // Pastikan ID diubah ke integer
            data: { email, name }, // Hanya update field yang ada di body
        });
        res.json(updatedUser);
    } catch (error) {
        // Handle jika ID user tidak ditemukan
        res.status(404).json({ error: 'User tidak ditemukan atau gagal memperbarui.' });
    }
};

// Fungsi: Menghapus user berdasarkan ID (DELETE /users/:id)
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Prisma akan menghapus record, dan mengembalikan object dari record yang dihapus
        await prisma.user.delete({
            where: { id: parseInt(id) }, // Pastikan ID diubah ke integer
        });
        // Response 204 No Content adalah standar untuk operasi DELETE yang sukses
        res.status(204).send(); 
    } catch (error) {
        // Handle jika ID user tidak ditemukan
        res.status(404).json({ error: 'User tidak ditemukan atau gagal menghapus.' });
    }
};