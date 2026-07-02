import { NextFunction, Request, Response } from 'express';
import CreatePlayStationNetworkService from '../services/CreatePlayStationNetworkService';
import ListPlayStationNetworkService from '../services/ListPlayStationNetworkService';
import UpdatePlayStationNetworkService from '../services/UpdatePlayStationNetworkService';

export default class PlayStationNetworkController {

  public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const listPsn = new ListPlayStationNetworkService();
      const psnProfiles = await listPsn.execute();
      
      return response.json(psnProfiles);
    } catch (err) {
      next(err);
    }
  }

  public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { profile_name, psn_id, region } = request.body;

      const createPsn = new CreatePlayStationNetworkService();

      const psnProfile = await createPsn.execute({
        profile_name,
        psn_id,
        region,
      });

      return response.json(psnProfile);
    } catch (err) {
      next(err);
    }
  }

  public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params; // O ID vem da URL
      const { profile_name, region } = request.body; // Os novos dados vêm do corpo da requisição

      const updatePsn = new UpdatePlayStationNetworkService();

      const psnProfile = await updatePsn.execute({
        id,
        profile_name,
        region,
      });

      return response.json(psnProfile);
    } catch (err) {
      next(err);
    }
  }
}