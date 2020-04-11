const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const auth = require('./auth');

const app = express();
const corsOptions = {
  origin: 'http://localhost',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(express.json());
app.use(cors(corsOptions));

app.use(routes);
app.use(auth);
module.exports = app;
