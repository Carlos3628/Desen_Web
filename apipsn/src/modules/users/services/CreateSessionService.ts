import AppError from '@shared/errors/AppError';
import { AppDataSource } from '@shared/typeorm/data-source';
import User from '../typeorm/entities/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export default class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = AppDataSource.getRepository(User);

    // 1. Verificar se o utilizador existe através do email
    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    // 2. Comparar a palavra-passe enviada com o hash guardado
    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    // 3. Gerar o token JWT
    const token = sign({}, authConfig.jwt.secret as string, {
      subject: String(user.id),
      expiresIn: authConfig.jwt.expiresIn as any, // Adiciona o 'as any' aqui!
    });

    return {
      user,
      token,
    };
  }
}