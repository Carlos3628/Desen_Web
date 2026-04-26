import { NextFunction, Request, Response } from "express";
import ListDragonService from "../services/ListDragonService";
import ShowDragonService from "../services/ShowDragonService";
import CreateDragonService from "../services/CreateDragonService";
import UpdateDragonService from "../services/UpdateDragonService";
import DeleteDragonService from "../services/DeleteDragonService";

export default class DragonController{

    public async index(
        request: Request, 
        response: Response, 
        next: NextFunction,
    ): Promise<Response | void> {
        try{
            const listDragons = new ListDragonService();
            const dragons = await listDragons.execute();
            return response.status(200).json(dragons);
        } catch(err){
                next(err);
            }
        }

    public async delete(
        request: Request, 
        response: Response, 
        next: NextFunction,
    ): Promise<Response | void> {
        try{
            const id = request.params.id as string;
            const deleteDragon = new DeleteDragonService();
            await deleteDragon.execute({id});
            return response.status(204).send();
        }
        catch(err){
                next(err);
            }
    }
    
    public async create(
        request: Request, 
        response: Response, 
        next: NextFunction,
    ): Promise<Response | void> {
        try{
            const {name, nivel, elemento, vida, poder} = request.body;
            const createDragon = new CreateDragonService();
            const dragon = await createDragon.execute({name, nivel, elemento, vida, poder});
            return response.status(201).json(dragon);
        }catch(err){
                next(err);
            }
        }

    public async update(
        request: Request, 
        response: Response, 
        next: NextFunction,
    ): Promise<Response | void> {
        try{
            const id = request.params.id as string;
            const {name, elemento, nivel, vida, poder} = request.body;
            const updateDragon = new UpdateDragonService();
            const dragon = await updateDragon.execute({id, name, elemento, nivel, vida, poder});
            return response.status(200).json(dragon);
        }catch(err){
                next(err);
            }
        }

    public async show(
        request: Request, 
        response: Response, 
        next: NextFunction,
    ): Promise<Response | void> {
        try{
            const id = request.params.id as string;
            const showDragon = new ShowDragonService();
            const dragon = await showDragon.execute({id});
            return response.status(200).json(dragon);
        }catch(err){
                next(err);
            }
        }
}