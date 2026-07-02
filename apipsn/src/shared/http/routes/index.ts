import { Router } from 'express';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import psnRouter from '@modules/psn/routes/psn.routes';
import gamesRouter from '@modules/gamesp/routes/games.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/psn', psnRouter);
routes.use('/games', gamesRouter);

export default routes;