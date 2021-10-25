const express = require('express');

const todoController = require('../controllers/todo');
const verifyToken = require('../utils/verify-token');

const router = express.Router();

router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.post('/logout', verifyToken, userController.logoutUser);

router.get('/',  verifyToken, todoController.getTodos);
router.post('/',  verifyToken, todoController.createTodo);
router.put('/togStat',  verifyToken, todoController.updateStatus);

router.put('/',  verifyToken, todoController.updateTodo);
router.delete('/',  verifyToken, todoController.deleteTodo);

module.exports = router;