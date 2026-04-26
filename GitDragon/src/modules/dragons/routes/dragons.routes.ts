import { Router } from "express";
import DragonController from "../controllers/DragonController";
import { celebrate, Joi, Segments } from "celebrate";

const dragonsRouter = Router();
const dragonsController = new DragonController();

dragonsRouter.get('/', async(req, res, next) => {
    try{
        await dragonsController.index(req, res, next);
    }catch(err){
        next(err);
    }
});

dragonsRouter.get('/:id', celebrate({
    [Segments.PARAMS] : {id: Joi.string().uuid().required()},
}),
    
    async(req, res, next) => {
    try{
        await dragonsController.show(req, res, next);
    }catch(err){
        next(err);
    }
});

dragonsRouter.post('/', celebrate({
    [Segments.BODY]:{
        name: Joi.string().required(),
        nivel: Joi.number().min(0).required(),
        elemento: Joi.string().required(),
        vida: Joi.number().precision(2).min(0).required(),
        poder: Joi.number().precision(2).min(0).required()
    }
}),
async(req, res, next) => {
    try{
        await dragonsController.create(req, res, next);
    }catch(err){
        next(err);
    }
});

dragonsRouter.put('/:id', celebrate({
    [Segments.PARAMS] : {id: Joi.string().uuid().required()},
    [Segments.BODY]:{
        name: Joi.string().required(),
        nivel: Joi.number().min(0).required(),
        elemento: Joi.string().required(),
        vida: Joi.number().precision(2).min(0).required(),
        poder: Joi.number().precision(2).min(0).required()
    }
}),
    async(req, res, next) => {
    try{
        await dragonsController.update(req, res, next);
    }catch(err){
        next(err);
    }
});

dragonsRouter.delete('/:id', 
    celebrate({
    [Segments.PARAMS] : {id: Joi.string().uuid().required()},
}),
    async(req, res, next) => {
    try{
        await dragonsController.delete(req, res, next);
    }catch(err){
        next(err);
    }
});

export default dragonsRouter;