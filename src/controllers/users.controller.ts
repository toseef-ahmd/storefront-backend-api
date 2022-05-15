import { Request, Response } from "express"
import { UserModel } from "../models/users.model"
import { User } from "../interfaces/users.interface"
import { DataObject } from "../interfaces/common.interface"
import jwt from "jsonwebtoken"
import { NO_CONTENT } from "http-status-codes"

const model = new UserModel()

export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: DataObject = await model.index()

    res.status(users.status)
    res.json(users.data)
  } catch (error) {
    res.status(NO_CONTENT)
    res.json(error)
  }
}

export const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: DataObject = await model.show(parseInt(req.params.id))

    res.status(user.status)
    res.json(user.data)
  } catch (error) {
    res.status(NO_CONTENT)
    res.json(error)
  }
}

export const create = async (req: Request, res: Response): Promise<void> => {
  const user: User = {
    firstname: req.body.firstname as string,
    lastname: req.body.lastname as string,
    password_digest: req.body.password as string,
    username: req.body.username as string,
  }
  console.log(user)
  try {
    const newUser: DataObject = await model.create(user)

    const { status, data } = newUser

    const token = await generateToken(data as User) //jwt.sign({ id: _id }, process.env.JWT_SECRET as string)

    res.status(status)
    res.json({ token: token })
  } catch (error) {
    res.status(NO_CONTENT)
    res.json(error)
  }
}

export const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted: DataObject = await model.delete(parseInt(req.params.id))

    res.status(deleted.status)
    res.json(deleted.data)
  } catch (error) {
    res.status(NO_CONTENT)
    res.json(error)
  }
}

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const temp: JSON = req.body as JSON

    const updated: DataObject = await model.update(
      parseInt(req.params.id),
      temp
    )

    res.status(updated.status)
    res.json(updated.data)
  } catch (error) {
    res.status(NO_CONTENT)
    res.json(error)
  }
}

export const authenticate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
   
    const result: DataObject = await model.authenticate(
      req.body.username,
      req.body.password
    )
    const { status, data } = result
    
    console.log(result)
    res.status(status)
    if(status==200) {
      const token = await generateToken(data as User);
      res.json({token: token})
    }
    else {
      res.json(data)
    }
  } catch (error) {
    res.status(NO_CONTENT)
    res.json(error)
  }
}

export const clean = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted: boolean = await model.clean()

    res.status(200)
    res.json({ deleted: deleted })
  } catch (error) {
    res.status(NO_CONTENT)
    res.json(error)
  }
}

export const generateToken =async (user: User) : Promise<string> => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

  return token;
}
