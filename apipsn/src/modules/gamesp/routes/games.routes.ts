import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import GameController from '../controllers/GameController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const gamesRouter = Router();
const gameController = new GameController();

gamesRouter.use(isAuthenticated);

gamesRouter.get('/', gameController.index);

gamesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  gameController.delete,
);

gamesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      developer: Joi.string().required(),
      psn_id: Joi.string().uuid().required(), // Validamos que é um formato UUID
    },
  }),
  gameController.create,
);

export default gamesRouter;