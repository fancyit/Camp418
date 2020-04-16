require('dotenv').config();
const server = require('./server');
const logger = require('./lib/logger');

const port = 2000;
server.listen(port, () => logger.log(`Listening on port ${port}!`));
