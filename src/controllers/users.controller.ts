import { Request, Response } from "express"
import { UserModel } from "../models/users.model"
import { User } from "../interfaces/users.interface"
import jwt from "jsonwebtoken"
import { DataObject } from "../interfaces/common.interface"
import { NOT_FOUND } from "http-status-codes"

const model = new UserModel()

export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: DataObject = await model.index()

    res.status(users.status)
    res.json(users.data)
  } catch (error) {
    res.status(NOT_FOUND)
    res.json(error)
  }
}

export const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: DataObject = await model.show(parseInt(req.params.id))

    res.status(user.status)
    res.json(user.data)
  } catch (error) {
    res.status(NOT_FOUND)
    res.json(error)
  }
}

export const create = async (req: Request, res: Response): Promise<void> => {
  const user: User = {
    firstname: req.body.firstname as string,
    lastname: req.body.lastname as string,
    password_digest: req.body.password_digest as string,
    username: req.body.username as string,
  }

  try {
    const newUser: DataObject = await model.create(user)

    const { status, data } = newUser

    let _id
    for (const [key, value] of Object.entries(data)) {
      if (key === "id") {
        _id = value
      }
    }

    const token = jwt.sign({ id: _id }, process.env.JWT_SECRET as string)

    res.status(status)
    res.json({ token: token })
  } catch (error) {
    res.status(NOT_FOUND)
    res.json(error)
  }
}

export const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted: DataObject = await model.delete(parseInt(req.params.id))

    res.status(deleted.status)
    res.json(deleted.data)
  } catch (error) {
    res.status(NOT_FOUND)
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
    res.status(NOT_FOUND)
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
    res.status(status)
    res.json(data)
  } catch (error) {
    console.log("Catch")
    res.status(NOT_FOUND)
    res.json(error)
  }
}

export const clean = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted: boolean = await model.clean()

    res.status(200)
    res.json({ deleted: deleted })
  } catch (error) {
    res.status(NOT_FOUND)
    res.json(error)
  }
}
