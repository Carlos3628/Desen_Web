import AppError from '@shared/errors/AppError';
import { AppDataSource } from '@shared/typeorm/data-source';
import Game from '../typeorm/entities/Game';
import PlayStationNetwork from '@modules/psn/typeorm/entities/PlayStationNetwork';

interface IRequest {
  title: string;
  developer: string;
  psn_id: string; // ID do perfil da PSN
}

export default class CreateGameService {
  public async execute({ title, developer, psn_id }: IRequest): Promise<Game> {
    const gameRepository = AppDataSource.getRepository(Game);
    const psnRepository = AppDataSource.getRepository(PlayStationNetwork);

    // 1. Verificar se o perfil da PSN existe
    const psnExists = await psnRepository.findOne({
      where: { id: psn_id },
    });

    if (!psnExists) {
      throw new AppError('PSN profile not found.');
    }

    // 2. Criar e salvar o jogo
    const game = gameRepository.create({
      title,
      developer,
      psn_id,
    });

    await gameRepository.save(game);

    return game;
  }
}