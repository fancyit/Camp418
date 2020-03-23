const router = require('express').Router();
const controller = require('./game');

router.get('/getField', (req, res) => {
  res.send(200, controller.getField());
});

router.post('/move', (req, res) => {
  let data = controller.makeMove(req.body.x, req.body.y);
  if (!data) {
    res.status(409).send('Cell is taken or out of field!');
  } else if (data === 'Win'){
    res.status(200).send({ data: 'Win', winner: controller.getCurrentPlayer()});
  }
  else {
    res.status(200).send('OK');
  }
});
router.post('/reset', (req, res) => {
  res.send(200,controller.reset());
});

module.exports = router;
