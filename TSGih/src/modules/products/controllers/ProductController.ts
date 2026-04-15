import { NextFunction, Request, response, Response } from "express";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";
import CreateProductService from "../services/CreateProductService";
import UpdateProductService from "../services/UpdateProductService";
import DeleteProductService from "../services/DeleteProductService";

export default class ProductController{

    public async index(
        request: Request, 
        reponse: Response, 
        next: NextFunction,
    ): Promise<Response | void> {
        try{
            const listProducts = new ListProductService();
            const products = await listProducts.execute();
            return response.status(200).json(products);
        } catch(err){
                next(err);
            }
        }

    public async delete(
        request: Request, 
        reponse: Response, 
        next: NextFunction,
    ): Promise<Response | void> {
        try{
            const id = request.params.id as string;
            const deleteProduct = new DeleteProductService();
            await deleteProduct.execute({id});
            return response.status(204).send();
        }
        catch(err){
                next(err);
            }
    }
    
    public async create(
        request: Request, 
        reponse: Response, 
        next: NextFunction,
    ): Promise<Response | void> {
        try{
            const {name, price, quantity} = request.body;
            const createProduct = new CreateProductService();
            const product = await createProduct.execute({name, price, quantity});
            return response.status(201).json(product);
        }catch(err){
                next(err);
            }
        }

    public async update(
        request: Request, 
        reponse: Response, 
        next: NextFunction,
    ): Promise<Response | void> {
        try{
            const id = request.params.id as string;
            const {name, price, quantity} = request.body;
            const updateProduct = new UpdateProductService();
            const product = await updateProduct.execute({id, name, price, quantity});
            return response.status(200).json(product);
        }catch(err){
                next(err);
            }
        }

    public async show(
        request: Request, 
        reponse: Response, 
        next: NextFunction,
    ): Promise<Response | void> {
        try{
            const id = request.params.id as string;
            const showProduct = new ShowProductService();
            const product = await showProduct.execute({id});
            return response.status(200).json(product);
        }catch(err){
                next(err);
            }
        }
}