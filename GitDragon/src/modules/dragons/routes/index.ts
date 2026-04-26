import { Router } from 'express';
import dragonsRouter from './dragons.routes'; // Importa as rotas do arquivo dragons.routes.ts

const routes = Router();

// Define que tudo que chegar em "/dragons" vai ser resolvido pelo dragonsRouter
routes.use('/dragons', dragonsRouter);

export default routes;