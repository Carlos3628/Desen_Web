import { AppDataSource } from "@shared/typeorm/data-source";
import Product from "../typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

interface IRequest{
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export default class UpdateProductService{
    public async execute({id, name, price, quantity}: IRequest):Promise<Product>{
        const productsRepository = AppDataSource.getRepository(Product);

        const product = await productsRepository.findOneBy({id});
        if(!product){
            throw new AppError("Product not found.");
        }

        const productsExists = await productsRepository.findOne({
            where : { name }
        });
        if(productsExists && productsExists.id !== product.id){
            throw new AppError("There is already one product whith this name");
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;
        await productsRepository.save(product);
        return product;
    }
}