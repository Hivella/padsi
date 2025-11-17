// src/controllers/projectController.js
const prisma = require('../db/prisma'); // Import Prisma Client

// Fungsi: Mengambil SEMUA Project (GET /projects)
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await prisma.project.findMany({
            // Sertakan data pemilik (User) saat mengambil project
            include: { owner: true }, 
        });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Gagal mengambil data proyek.' });
    }
};

// Fungsi: Membuat Project Baru (POST /projects)
exports.createProject = async (req, res) => {
    const { title, description, ownerId } = req.body;
    
    // Pastikan field wajib ada
    if (!title || !ownerId) {
        return res.status(400).json({ error: 'Title dan ownerId wajib diisi.' });
    }

    try {
        const newProject = await prisma.project.create({
            data: { 
                title, 
                description, 
                ownerId: parseInt(ownerId), // Pastikan ownerId diubah ke integer
            },
            include: { owner: true } // Sertakan user yang membuat
        });
        res.status(201).json(newProject);
    } catch (error) {
        // Error sering terjadi jika ownerId tidak valid
        res.status(500).json({ error: 'Gagal membuat proyek. Pastikan ownerId valid.' });
    }
};

// Fungsi: Memperbarui Project (PUT /projects/:id)
exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const updatedProject = await prisma.project.update({
            where: { id: parseInt(id) }, 
            data: { title, description },
        });
        res.json(updatedProject);
    } catch (error) {
        res.status(404).json({ error: 'Proyek tidak ditemukan atau gagal diperbarui.' });
    }
};

// Fungsi: Menghapus Project (DELETE /projects/:id)
exports.deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.project.delete({
            where: { id: parseInt(id) },
        });
        // Status 204 No Content
        res.status(204).send(); 
    } catch (error) {
        res.status(404).json({ error: 'Proyek tidak ditemukan atau gagal menghapus.' });
    }
};