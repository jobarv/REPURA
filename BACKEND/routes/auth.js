const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/profile', authController.isLoggedIn);
router.get('/dashboard', authController.dashboard);
router.get('/facturacion', authController.dashboard);
router.get('/logout', authController.logout);



module.exports = router;