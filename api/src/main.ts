import express from 'express';
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 8080;

const {loadRoutes} = require('./router');
const server = express();
server.get('/healthcheck', (_, res) => {
    res.send('');
});
server.use(helmet());
server.use(compression());
server.use(bodyParser.json());
server.use(cors());

loadRoutes(server);

const serverListener = server.listen(port, (err: Error) => {
    if (err) throw err;
    console.warn(`> Ready on http://localhost:${port}`);
});
serverListener.on("error", function (err) {
    console.log(err)
});
