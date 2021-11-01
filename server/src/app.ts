import express from 'express';
import config from './config';
import init from './loaders';

async function startServer() {
  const app = express();

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
