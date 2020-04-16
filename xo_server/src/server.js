const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const auth = require('./auth');
const errNotify = require('./helpers/errorUtils');

const app = express();
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(express.json());
app.use(cors(corsOptions));

app.use(routes.build());
app.use(auth);

app.use(errNotify);
module.exports = app;
