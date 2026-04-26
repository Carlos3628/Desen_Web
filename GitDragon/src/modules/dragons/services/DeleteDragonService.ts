import { AppDataSource } from "@shared/typeorm/data-source";
import Dragon from "../typeorm/entities/Dragon";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
}

export default class DeleteDragonService {
    // Mudei para Promise<void> pois não precisamos retornar o dragão depois de deletá-lo
    public async execute({ id }: IRequest): Promise<void> {
        const dragonRepository = AppDataSource.getRepository(Dragon);

        // 1. Adicionado o 'await' para aguardar a resposta do banco
        const dragon = await dragonRepository.findOneBy({ id });

        if (!dragon) {
            throw new AppError("Dragon not found");
        }
        
        // 2. Adicionado o comando para efetivamente remover o dragão do banco
        await dragonRepository.remove(dragon);
    }
}