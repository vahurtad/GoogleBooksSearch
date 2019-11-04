const express = require('express');
const next = require('next');
const preCompression = require('@moxy/next-pre-compression/express-middleware');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 3000;

app.prepare().then(() => {
  const server = express();

  server.use(preCompression(app, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  }));

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) { throw err; }

    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${port}`);
  });
})
  .catch((err) => {
    setImmediate(() => { throw err; });
  });