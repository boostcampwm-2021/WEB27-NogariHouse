import 'module-alias/register';
import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import io from '@sockets/index';

import config from '@config/index';
import init from '@loaders/index';

async function startServer() {
  dotenv.config();
  const app = express();

  const server = http.createServer(app);
  io.attach(server);

  await init({ app });

  server.listen(config.port, () => {
    console.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
  }).on('error', (err) => {
    console.error(err);
    process.exit(1);
  });
}

startServer();
