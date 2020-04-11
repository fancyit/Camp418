const jwt = require('jsonwebtoken');

function generateAccessToken(user, tokenOpt) {
  let token = '';
  switch (tokenOpt) {
    case 'access':
      token = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: 60 });
      break;
    case 'refresh':
      token = jwt.sign(user, process.env.REFRESH_SECRET);
      break;
    default:
      token = '';
      break;
  }
  return token;
}

function tokenValidation(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return res.sendStatus(401);
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send(err.toString());
    req.user = user;
    next();
  });
}


module.exports = {
  tokenValidation,
  generateAccessToken,
};
