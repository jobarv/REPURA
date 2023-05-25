const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/login', authController.login)
router.post('/register', authController.register)
router.get('/dashboard', authController.dashboard)



module.exports = router;