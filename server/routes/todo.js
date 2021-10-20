const express = require('express');

const todoController = require('../controllers/todo');

const router = express.Router();

router.get('/', todoController.getTodos);
router.post('/', todoController.createTodo);
router.put('/', todoController.updateTodo);
router.delete('/', todoController.deleteTodo);

module.exports = router;