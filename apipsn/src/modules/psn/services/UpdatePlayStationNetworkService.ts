import AppError from '@shared/errors/AppError';
import { AppDataSource } from '@shared/typeorm/data-source';
import PlayStationNetwork from '../typeorm/entities/PlayStationNetwork';

interface IRequest {
  id: string;
  profile_name: string;
  region: string;
}

export default class UpdatePlayStationNetworkService {
  public async execute({ id, profile_name, region }: IRequest): Promise<PlayStationNetwork> {
    const psnRepository = AppDataSource.getRepository(PlayStationNetwork);

    // 1. Procura o perfil pelo ID
    const psnProfile = await psnRepository.findOne({
      where: { id },
    });

    if (!psnProfile) {
      throw new AppError('PSN profile not found.');
    }

    // 2. Atualiza os dados
    psnProfile.profile_name = profile_name;
    psnProfile.region = region;

    // 3. Salva as alterações na base de dados (o TypeORM faz o UPDATE automaticamente)
    await psnRepository.save(psnProfile);

    return psnProfile;
  }
}