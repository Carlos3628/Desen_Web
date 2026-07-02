import { AppDataSource } from '@shared/typeorm/data-source';
import Game from '../typeorm/entities/Game';

export default class ListGameService {
  public async execute(): Promise<Game[]> {
    const gameRepository = AppDataSource.getRepository(Game);

    // O relations: { psn: true } faz o Join inverso,
    // trazendo os dados do perfil dono do jogo.
    const games = await gameRepository.find({
      relations: {
        psn: true, 
      },
    });

    return games;
  }
}