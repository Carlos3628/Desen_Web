import AppError from '@shared/errors/AppError';
import { AppDataSource } from '@shared/typeorm/data-source';
import User from '../typeorm/entities/User';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = AppDataSource.getRepository(User);

    // Verifica se o email já está registado
    const emailExists = await usersRepository.findOne({
      where: { email },
    });

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    // Encripta a palavra-passe (o número 8 é o "salt", a complexidade do hash)
    const hashedPassword = await hash(password, 8);

    // Cria a instância do utilizador
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    // Guarda na base de dados
    await usersRepository.save(user);

    return user;
  }
}