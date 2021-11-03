import 'module-alias/register';
import express from 'express';
import dotenv from 'dotenv';

import config from '@config/index';
import init from '@loaders/index';

async function startServer() {
  const app = express();
  dotenv.config();

  await init({ app });

  app.listen(config.port, () => {
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
