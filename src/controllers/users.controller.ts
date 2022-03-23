import express, {Request, Response} from 'express'
import { UserModel } from '../models/users.model'
import { User } from '../interfaces/users.interface';
import jwt from 'jsonwebtoken'
import { IsOwner } from '../middlewares/auth.middleware';

const model = new UserModel();

export const index = async (req:Request, res: Response) : Promise<void> => {
    const users : User[] = await model.index()
       
    users ? res.json(users) : res.json({error : 'No records found.'});
}

export const show = async (req: Request, res: Response) : Promise<void> => {
    const user : User = await model.show(parseInt(req.params.id))
    
    user ? res.json(user) : res.json({error: `No User Found with the id ${req.params.id}`})
}

export const create = async (req: Request, res: Response) : Promise<void> => {
    const user: User = {
        email : req.body.email,
        password : req.body.password,
        phone : req.body.phone,
        username : req.body.username,
    }

    const newUser : User = await model.create(user)
    const token = jwt.sign({id : newUser.id}, process.env.JWT_SECRET as string)

    res.json({token: token})
}

export const destroy = async (req: Request, res: Response) : Promise<void> => {
    
    const deleted : User = await model.delete(parseInt(req.params.id))
    
    deleted ? res.json({success: 'User Deleted successfully'}) : res.json({error: `No User Found with the id ${req.params.id}`})
}

export const update = async (req: Request, res: Response) : Promise<void> => {
    const temp : JSON= req.body as JSON
    
    const updated = await model.update(parseInt(req.params.id), temp);

    updated ? res.json(updated) : res.json({error: `No User Found with the id ${req.params.id}`})
}

export const authenticate = async (req:Request, res : Response) : Promise<void> => {
    
    const user = await model.authenticate(req.body.email, req.body.password);

    user ? res.json(user) : res.json({error : 'Something went wrong'});
}
