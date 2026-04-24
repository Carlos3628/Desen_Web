import { AppDataSource } from "@shared/typeorm/data-source"; 
import Dragon from "../typeorm/entities/Dragon"; 
export default class ListDragonService { 
public async execute(): Promise<Dragon[]> { 
const dragonsRepository = AppDataSource.getRepository(Dragon); 
return dragonsRepository.find();
} 
}