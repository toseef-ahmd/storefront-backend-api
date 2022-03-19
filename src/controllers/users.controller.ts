import express, {Request, Response} from 'express'
import { UserModel } from '../models/users.model'
import { User } from '../interfaces/users.interface';
import { CREATED, NOT_FOUND, OK } from 'http-status-codes';
const model = new UserModel();

export const index = async (req:Request, res: Response) : Promise<void> => {
    try {
        const products : User[] = await model.index()
        res.status(OK)
        res.json(products);

    } catch (error) {
        res.status(NOT_FOUND)
        res.json(error)
    }
}

export const show = async (req: Request, res: Response) : Promise<void> => {
   try {
    const product : User = await model.show(req.body.id)
    
    res.status(OK)
    res.json(product)
   } catch (error) {
        res.status(NOT_FOUND)
        res.json(error)
   }
}

export const create = async (req: Request, res: Response) : Promise<void> => {
    try {
        const product: User = {
            email : req.params.email,
            password : req.params.password,
            phone : req.params.phone,
            username : req.params.username,
        }

        const newUser : User = await model.create(product)
        
        res.status(CREATED);
        res.json(newUser)

    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

export const destroy = async (req: Request, res: Response) : Promise<void> => {
   try {
    const deleted : User = await model.delete(req.body.id)
    
    res.status(OK)
    res.json(deleted)

   } catch (error) {
       res.status(NOT_FOUND)
       res.json(error)
   }
}

export const update = async (req: Request, res: Response) : Promise<void> => {
   try {
    const deleted = await model.delete(req.body.id)
    
    res.status(OK)
    res.json(deleted)
   } catch (error) {
        res.status(NOT_FOUND)
        res.json(error)
   }
}
