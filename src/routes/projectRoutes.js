// src/routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Rute untuk GET SEMUA dan POST BARU (/projects)
router.route('/')
    .get(projectController.getAllProjects)
    .post(projectController.createProject);

// Rute untuk operasi spesifik berdasarkan ID (/projects/:id)
router.route('/:id')
    .put(projectController.updateProject)
    .delete(projectController.deleteProject);

module.exports = router;