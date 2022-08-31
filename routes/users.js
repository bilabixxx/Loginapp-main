const router = require('express').Router();
const { authorized } = require('../midlleware/auth');
const { dashboard, login, signup, logout, updateUser, updateThemeColor, getUser, deleteUser } = require('../controllers/users');


router.get('/dashboard', authorized, dashboard);
router.get('/user', authorized, getUser);
router.post('/theme', authorized, updateThemeColor);
router.post('/logout', authorized, logout);
router.patch('/edit', authorized, updateUser);
router.delete('/delete', authorized, deleteUser);

router.post('/login', login);
router.post('/register', signup);






module.exports = router;
