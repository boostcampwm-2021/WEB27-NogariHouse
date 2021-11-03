import express from 'express';
import expressLoader from './express';
import mongooseLoader from './mongoose';

async function init(expressApp: { app: express.Application; }) {
  await mongooseLoader();
  await expressLoader(expressApp);
}

export default init;
