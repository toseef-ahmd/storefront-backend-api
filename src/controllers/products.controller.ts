import express, {Request, Response} from 'express'
import { ProductModel } from '../models/products.model'
import { Product } from '../interfaces/products.interface';

const model : ProductModel = new ProductModel();

export const index = async (req:Request, res: Response) : Promise<void> => {
    const products : Product[] = await model.index()
   
    res.json(products);
}

export const show = async (req: Request, res: Response) : Promise<void> => {
    
    const product : Product = await model.show(req.params.id)
    
    res.json(product)
}

export const create = async (req: Request, res: Response) : Promise<void> => {
     //console.log('request: ', req)
     const product: Product = {
        title : req.body.title,
        price : (req.body.price as unknown)as number,
        category : req.body.category,
        details: req.body.details
    }

    const newProduct : Product = await model.create(product)
     
    res.json(newProduct)
}

export const destroy = async (req: Request, res: Response) : Promise<void> => {
    const deleted : Product = await model.delete(parseInt(req.params.id))
    
    res.json(deleted)
}

export const update = async (req: Request, res: Response) : Promise<void> => {
    const product : JSON = req.body as JSON;

    const updated = await model.update(parseInt(req.params.id), product)
    res.json(updated)
}
