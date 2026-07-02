import { NextFunction, Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

export default class UserController {
  public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { name, email, password } = request.body;

      const createUser = new CreateUserService();

      const user = await createUser.execute({
        name,
        email,
        password,
      });

      return response.json(user);
    } catch (err) {
      next(err);
    }
  }
}