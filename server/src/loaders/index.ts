import express from 'express';
import expressLoader from './express';

async function init(expressApp: { app: express.Application; }) {
  await expressLoader(expressApp);
}

export default init;
