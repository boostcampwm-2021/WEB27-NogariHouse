import {
  Router, Request, Response,
} from 'express';

const route = Router();

export default (app: Router) => {
  app.use('/room', route);

  route.post('/', (req: Request, res: Response) => {
    try {
      const {
        type, title, participants, isAnonymus,
      } = req.body;

      res.status(200).send('success!');
    } catch (error) {
      console.error(error);
    }
  });
};
