const router = require('express').Router();
const bcrypt = require('bcrypt');
const users = require('./lib/localDB.json');
const addUser = require('./helpers/fileWriter');
const { generateAccessToken } = require('./helpers/authUtlis');

router.post('/signUp', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 5);
    addUser(
      {
        id: users.length,
        username,
        password: hashedPass,
      },
    );
    await res.status(201).send('OK');
  } catch (err) {
    await res.status(500).send(err.toString());
  }
});

router.post('/signIn', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
      const accessToken = await generateAccessToken(username, 'access');
      const refreshToken = await generateAccessToken(username, 'refresh');
      res.status(200).send({ user: username, accessToken, refreshToken });
    } else {
      res.status(401).send('Check the user specified!');
    }
  } catch (err) {
    await res.status(500).send(err.toString());
  }
});
module.exports = router;
