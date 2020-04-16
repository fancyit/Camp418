const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('./lib/localDB.json');
const addUser = require('./helpers/fileWriter');
const { generateAccessToken } = require('./helpers/authUtlis');

let refreshTokens = [];

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
      refreshTokens.push(refreshToken);
      res.status(200).send({ user: username, accessToken, refreshToken });
    } else {
      res.status(401).send('Check the user specified!');
    }
  } catch (err) {
    await res.status(500).send(err.toString());
  }
});

router.post('/rToken', async (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken === null) res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
    if (err) res.sendStatus(403);
    const accessToken = generateAccessToken(user, 'access');
    res.json(accessToken);
  });
});
module.exports = router;
