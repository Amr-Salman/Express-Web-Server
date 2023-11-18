const express = require('express');
const app = express();
const usersRoutes = require('./routes/usersRoutes');
const todosRoutes = require('./routes/todosRoutes');
const { loggedInMiddleware } = require('./middlewares/loggedInMiddleware');
const morgan = require('morgan');
const port = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(['/todo'], loggedInMiddleware);
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.url(req, res),
      tokens.method(req, res),
      tokens.status(req, res),
      new Date(Date.now()).toLocaleDateString('en-GB'),
    ].join(' ');
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});
app.use('/users', usersRoutes);
app.use('/todos', todosRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use((err, req, res, next) => {
  res.statusCode = 500;
  res.send({ error: 'internal server error' });
});
