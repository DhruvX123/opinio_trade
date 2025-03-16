const express = require('express');
const { signup, login, registerAdmin, loginAdmin } = require('../controllers/userController');

const router = express.Router();

router.post('/admin/register', registerAdmin);
router.post('/admin/login', loginAdmin);
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
