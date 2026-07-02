import AppError from '@shared/errors/AppError';
import { AppDataSource } from '@shared/typeorm/data-source';
import Game from '../typeorm/entities/Game';

export default class DeleteGameService {
  public async execute(id: string): Promise<void> {
    const gameRepository = AppDataSource.getRepository(Game);

    // Verifica se o jogo existe pelo ID
    const game = await gameRepository.findOne({
      where: { id },
    });

    if (!game) {
      throw new AppError('Game not found.');
    }

    // Remove o jogo da base de dados
    await gameRepository.remove(game);
  }
}