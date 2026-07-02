import { NextFunction, Request, Response } from 'express';
import CreateGameService from '../../gamesp/services/CreateGameService';
import ListGameService from '../services/ListGameService';
import DeleteGameService from '../services/DeleteGameService';

export default class GameController {

  public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const listGames = new ListGameService();
      const games = await listGames.execute();

      return response.json(games);
    } catch (err) {
      next(err);
    }
  }
  
  public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { title, developer, psn_id } = request.body;

      const createGame = new CreateGameService();

      const game = await createGame.execute({
        title,
        developer,
        psn_id,
      });

      return response.json(game);
    } catch (err) {
      next(err);
    }
  }

  public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params; // Pegamos o ID direto do URL da rota

      const deleteGame = new DeleteGameService();

      await deleteGame.execute(id);

      // Retorna uma resposta vazia com status de sucesso
      return response.json([]); 
    } catch (err) {
      next(err);
    }
  }
}