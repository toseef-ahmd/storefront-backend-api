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
    const product : User = await model.show(parseInt(req.params.id))
    
    res.status(OK)
    res.json(product)
   } catch (error) {
        res.status(NOT_FOUND)
        res.json(error)
   }
}

export const create = async (req: Request, res: Response) : Promise<void> => {
    const user: User = {
        email : req.body.email,
        password : req.body.password,
        phone : req.body.phone,
        username : req.body.username,
    }

    const newUser : User = await model.create(user)

    res.json(newUser)
}

export const destroy = async (req: Request, res: Response) : Promise<void> => {
    const deleted : User = await model.delete(parseInt(req.params.id))
    
    res.json(deleted)
}

export const update = async (req: Request, res: Response) : Promise<void> => {
    const deleted = await model.delete(parseInt(req.params.id))
    
    res.json(deleted)
}

export const authenticate = async (req:Request, res : Response) : Promise<void> => {
    const user = await model.authenticate(req.body.email, req.body.password);

    res.json(user);
}
