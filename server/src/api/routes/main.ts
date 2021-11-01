import {
  Router, Request, Response,
} from 'express';

const route = Router();

export default (app: Router) => {
  app.use('/', route);

  route.get('/', (req: Request, res: Response) => {
    const item: Array<number> = [1, 2, 4, 3, 5, 6, 8];
    res.status(200).send(item);
  });
};
