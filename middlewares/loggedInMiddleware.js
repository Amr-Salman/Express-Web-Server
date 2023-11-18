const { readDB } = require('../helpers/db');

const loggedInMiddleware = async (req, res, next) => {
  const username = req.body.user;
  const users = await readDB('users.json');
  if (!username) {
    res.statusCode = 400;
    res.send({ error: 'Please log in first!' });
  } else {
    const currentUser = await users.filter(
      (user) => user.username === username && user.loggedIn
    );
    const isLoggedIn = currentUser.length === 1;
    if (!isLoggedIn) {
      res.statusCode = 400;
      res.send({ error: 'Please log in first!' });
    } else {
      next();
    }
  }
};

module.exports = {
  loggedInMiddleware,
};
