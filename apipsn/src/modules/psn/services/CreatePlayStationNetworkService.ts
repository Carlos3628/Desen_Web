import AppError from '@shared/errors/AppError';
import { AppDataSource } from '@shared/typeorm/data-source';
import PlayStationNetwork from '../typeorm/entities/PlayStationNetwork';

interface IRequest {
  profile_name: string;
  psn_id: string;
  region: string;
}

export default class CreatePlayStationNetworkService {
  public async execute({ profile_name, psn_id, region }: IRequest): Promise<PlayStationNetwork> {
    const psnRepository = AppDataSource.getRepository(PlayStationNetwork);

    // Verifica se já existe uma conta registrada com este PSN ID
    const psnExists = await psnRepository.findOne({
      where: { psn_id },
    });

    if (psnExists) {
      throw new AppError('There is already a profile registered with this PSN ID.');
    }

    const psnProfile = psnRepository.create({
      profile_name,
      psn_id,
      region,
    });

    await psnRepository.save(psnProfile);

    return psnProfile;
  }
}