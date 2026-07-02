import { AppDataSource } from '@shared/typeorm/data-source';
import PlayStationNetwork from '../typeorm/entities/PlayStationNetwork';

export default class ListPlayStationNetworkService {
  public async execute(): Promise<PlayStationNetwork[]> {
    const psnRepository = AppDataSource.getRepository(PlayStationNetwork);

    // O 'relations' garante que os jogos vêm anexados ao perfil
    const psnProfiles = await psnRepository.find({
      relations: {
        games: true,
      }, 
    });

    return psnProfiles;
  }
}