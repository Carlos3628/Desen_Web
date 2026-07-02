import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import PlayStationNetworkController from '../controllers/PlayStationNetworkController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated'; // Importa o middleware

const psnRouter = Router();
const psnController = new PlayStationNetworkController();

// Aplica o middleware em TODAS as rotas deste arquivo a partir desta linha
psnRouter.use(isAuthenticated);

psnRouter.get('/', psnController.index);

psnRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      profile_name: Joi.string().required(),
      region: Joi.string().required(),
    },
  }),
  psnController.update,
);

psnRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      profile_name: Joi.string().required(),
      psn_id: Joi.string().required(),
      region: Joi.string().required(),
    },
  }),
  psnController.create,
);

export default psnRouter;