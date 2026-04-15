import { AppDataSource } from "@shared/typeorm/data-source";
import Product from "../typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

interface IRequest{
    name: string;
    price: number;
    quantity: number;
}

export default class CreateProductService{
    public async execute({name, price, quantity}: IRequest):Promise<Product>{
        const productsRepository = AppDataSource.getRepository(Product);

        const productsExists = await productsRepository.findOne({
            where : { name }
        });
        if(productsExists){
            throw new AppError("There is already one product whith this name");
        }

        const product = productsRepository.create({name, price, quantity});
        await productsRepository.save(product);
        return product;
    }
}