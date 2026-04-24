import AppError from "@shared/errors/AppError"; 
import { AppDataSource } from "@shared/typeorm/data-source"; 
import Dragon from "../typeorm/entities/Dragon"; 
interface IRequest { 
id: string; 
} 
export default class ShowDragonService { 
public async execute({ id }: IRequest): Promise<Dragon> { 
const dragonsRepository = AppDataSource.getRepository(Dragon); 
const dragon = await dragonsRepository.findOneBy({ id }); 
if (!dragon) { 
throw new AppError("Dragon not found."); 
} 
return dragon; 
} 
}