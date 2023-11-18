const { readDB, writeDB } = require('../helpers/db.js');
const dbPath = '/todos.json';

// DESC     => Get all user todos
// Method   => GET '/todos/'
// Status   => Private

const getTodos = async (req, res) => {
  const db = await readDB(dbPath);
  const userNotes = await db.filter((note) => note.username === req.body.user);
  res.statusCode = 200;
  res.send(userNotes);
};

// DESC     => Create a new todo
// Method   => POST '/todos/'
// Status   => Private

const createTodo = async (req, res) => {
  const db = await readDB(dbPath);
  const newTodo = {
    username: req.body.user,
    title: req.body.title,
    id: Date.now(),
    status: 'Todo',
  };
  db.push(newTodo);
  writeDB(dbPath, db);
  res.statusCode = 201;
  res.send({ message: 'todo created successfully' });
};

// DESC     => Delete a todo
// Method   => DELETE '/todos/:id'
// Status   => Private

const deleteTodo = async (req, res) => {
  const todoID = req.params.id;
  const user = req.body.user;
  const db = await readDB(dbPath);
  const deletedTodo = db.filter((todo) => todo.id === Number(todoID));
  if (deletedTodo.length === 1 && deletedTodo[0].username === user) {
    const newDB = db.filter((todo) => todo.id !== Number(todoID));
    writeDB(dbPath, newDB);
    res.statusCode = 200;
    res.send({ message: 'Todo deleted successfully' });
  } else {
    res.statusCode = 404;
    res.send({ error: 'Todo not found!' });
  }
};

// DESC     => Update a todo
// Method   => Patch '/todos/:id'
// Status   => Private

const updateTodo = async (req, res) => {
  const todoID = req.params.id;
  const { user, title, status } = req.body;
  const db = await readDB(dbPath);
  const updatedTodo = db.filter((todo) => todo.id === Number(todoID));
  if (updatedTodo.length === 1 && updatedTodo[0].username === user) {
    const newDB = db.map((todo) => {
      if (todo.id === Number(todoID)) {
        todo = {
          ...todo,
          title: title ? title : todo.title,
          status: status ? status : todo.status,
        };
      }
      return todo;
    });
    writeDB(dbPath, newDB);
    res.statusCode = 200;
    res.send({ message: 'Todo updated successfully' });
  } else {
    res.statusCode = 404;
    res.send({ error: 'Todo not found!' });
  }
};

module.exports = {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
};
