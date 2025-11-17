// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
// Pastikan untuk mengimport controller yang sudah diperbarui
const userController = require('../controllers/userController'); 

// Rute untuk mendapatkan SEMUA user dan membuat user BARU
router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);


// --- TAMBAHKAN RUTE BARU DENGAN PARAMETER ID ---
// Rute untuk mendapatkan user spesifik, memperbarui, dan menghapus
router.route('/:id')
    // GET /users/:id (jika Anda ingin menambahkannya)
    // .get(userController.getUserById) 
    
    // PUT /users/:id
    .put(userController.updateUser) 

    // DELETE /users/:id
    .delete(userController.deleteUser); 


module.exports = router;