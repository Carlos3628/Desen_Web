import routes from './routes';
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import AppError from '@shared/errors/AppError';
import { AppDataSource } from '@shared/typeorm/data-source';

// Inicializa a conexão com o PostgreSQL
AppDataSource.initialize().then(() => {
  console.log('📦 Data Source inicializado com sucesso!');
  
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(routes); // Vamos descomentar isto assim que criarmos as nossas rotas
  
  // Middleware do Celebrate para intercetar erros de validação
  app.use(errors());

  // Middleware global de tratamento de erros (Aula 03)
  app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    
    console.error(error);
    
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  });

  app.listen(3333, () => {
    console.log('🚀 Server started on port 3333!');
  });
}).catch((error) => console.log('❌ Erro ao inicializar o Data Source:', error));