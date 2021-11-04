import { Router } from 'express';
import { get10EventItemsMiddleware } from '../middlewares/event-middlewares';

  const eventRouter = Router();

  export default (app: Router) => {
    app.use('/event', eventRouter);
  
    eventRouter.get('/',get10EventItemsMiddleware)
  };
  