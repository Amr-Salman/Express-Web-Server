const express = require('express');
const router = express.Router();
const todosControllers = require('../controllers/todosControllers');

router.get('/', todosControllers.getTodos);

router.post('/', todosControllers.createTodo);

router.delete('/:id', todosControllers.deleteTodo);

router.patch('/:id', todosControllers.updateTodo);

module.exports = router;
