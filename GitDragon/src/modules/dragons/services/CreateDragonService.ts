import AppError from "@shared/errors/AppError"; 
import { AppDataSource } from "@shared/typeorm/data-source"; 
import Dragon from "../typeorm/entities/Dragon"; 
interface IRequest { 
name: string; 
nivel: number;
elemento: string;
vida: number;
poder: number; 
} 
export default class CreateDragonService { 
public async execute({ name, nivel, elemento, vida, poder }: IRequest): 
Promise<Dragon> { 
const dragonsRepository = AppDataSource.getRepository(Dragon); 
const dragonsExists = await dragonsRepository.findOne({ 
where: { name }, 
}); 
if (dragonsExists) { 
throw new AppError("There is already one dragon with this name.");
} 
const dragon = dragonsRepository.create({ 
name,
nivel,
elemento, 
vida,
poder,
}); 
await dragonsRepository.save(dragon); 
return dragon; 
} 
}