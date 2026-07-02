import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

// Define o formato dos dados que estão dentro do token
interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // 1. Pega o token do cabeçalho da requisição
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.', 401);
  }

  // 2. O formato é "Bearer jdshfksdjhfkjsd...", então dividimos e pegamos só o token
  const [, token] = authHeader.split(' ');

  try {
    // 3. Verifica se o token é autêntico usando a nossa chave secreta
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as ITokenPayload;

    // 4. Injeta o ID do utilizador no pedido para usarmos nos próximos módulos
    request.user = {
      id: sub,
    };

    // 5. Deixa o pedido seguir em frente
    return next();
  } catch {
    throw new AppError('Invalid JWT Token.', 401);
  }
}