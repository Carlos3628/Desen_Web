import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source"; 
import Dragon from "../typeorm/entities/Dragon"; 
interface IRequest { 
id: string; 
name: string;
nivel: number;
elemento: string; 
vida: number;
poder: number; 
} 
export default class UpdateDragonService { 
public async execute({ id, name, nivel, elemento, vida, poder }: IRequest): 
Promise<Dragon> { 
const dragonsRepository = AppDataSource.getRepository(Dragon); 
const dragon = await dragonsRepository.findOneBy({ id }); 
if (!dragon) { 
throw new AppError("Dragon not found."); 
} 
const dragonsExists = await dragonsRepository.findOneBy({ name 
}); 
if (dragonsExists && dragonsExists.id !== dragon.id) { 
throw new AppError("There is already one dragon with this name."); 
} 
    dragon.name = name; 
    dragon.elemento = elemento; 
    dragon.nivel = nivel;
    dragon.vida = vida;
    dragon.poder = poder;
 
    await dragonsRepository.save(dragon); 
 
    return dragon; 
  } 
}