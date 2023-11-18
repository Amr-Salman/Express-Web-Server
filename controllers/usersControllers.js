const { readDB, writeDB } = require('../helpers/db.js');
const dbPath = '/users.json';

// DESC     => Register a user
// Method   => POST '/users/register'
// Status   => Public

const registerUser = async (req, res) => {
  const { username, password, firstName } = req.body;
  // Validate the inputs
  if (!username) {
    res.status(422);
    res.send({
      Error: '{username} is required!',
    });
  }
  if (!password) {
    res.status(422);
    res.send({
      Error: '{password} is required!',
    });
  }
  if (!firstName) {
    res.status(422);
    res.send({
      Error: '{firstName} is required!',
    });
  }
  const user = {
    username,
    password,
    firstName,
    loggedIn: false,
  };
  const db = await readDB(dbPath);
  db.push(user);
  writeDB(dbPath, db);
  console.log(db);
  res.send({ message: 'User was registered successfully' });
};

// DESC     => Login a user
// Method   => POST '/users/login'
// Status   => Public

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  // Validate the inputs
  if (!username) {
    res.status(422);
    res.send({
      Error: '{username} is required!',
    });
  }
  if (!password) {
    res.status(422);
    res.send({
      Error: '{password} is required!',
    });
  }

  const db = await readDB(dbPath);
  const userExists = await db.filter((user) => username === user.username);
  if (userExists.length === 1) {
    const updateUser = await db.map((user) => {
      if (user.username === username) {
        user.loggedIn = true;
      }
      return user;
    });
    console.log(updateUser);
    writeDB(dbPath, updateUser);
    res.send({
      message: 'User logged in successfully',
      profile: { name: userExists[0].username },
    });
  } else {
    res.status(422);
    res.send({
      Error: 'invalid credentials',
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
