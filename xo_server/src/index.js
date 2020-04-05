const server = require('./server');
const logger = require('./lib/logger');

const port = 2000;
server.listen(port, () => logger.log(`Example app listening on port ${port}!`));
