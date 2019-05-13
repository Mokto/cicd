const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const chokidar = require('chokidar');

const dev = process.env.NODE_ENV !== 'production';
const port = 8080;

let router;

if (dev) {
  require('@babel/register')({
    extensions: ['.ts', '.tsx']
  });
  const loadRouter = () => {
    try {
      router = require('./src/router.ts')();
    } catch (e) {
      console.log(e);
    }
  }
  loadRouter();
  chokidar.watch('./src').on('change', (event, path) => {
    console.warn('\nFiles changed. Reloaded the server.');
    Object.keys(require.cache).forEach((id) => {
      if (id.indexOf('src/') > -1) {
        delete require.cache[id];
      }
    });
    loadRouter();
  });
} else {
  router = require('./dist/router.js')();
}

const server = express();
server.get('/healthcheck', (req, res) => {
    res.send('');
});
server.use(helmet());
server.use(compression());
router.use(bodyParser.json());
router.use(cors());

server.use('/', (req, res, next) => {
    router(req, res, next);
});

const serverListener = server.listen(port, (err) => {
    if (err) throw err;
    console.warn(`> Ready on http://localhost:${port}`);
});
serverListener.on("error", function (err) {
    console.log(err)
});