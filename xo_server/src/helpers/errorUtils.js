function errorNotify(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke, check console!');
}
module.exports = errorNotify;
