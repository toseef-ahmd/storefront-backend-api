<<<<<<< HEAD
import { Request, Response, NextFunction } from "express"
import { METHOD_NOT_ALLOWED } from "http-status-codes"
import jwt, { JwtPayload } from "jsonwebtoken"
=======
import { Request, Response, NextFunction, response } from "express";
import { METHOD_NOT_ALLOWED } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../interfaces/users.interface";
import { UserModel } from "../models/users.model";
>>>>>>> 2b5d7c8571c385689df540c033850c0a5bbcd8e6


export const IsAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization
    const token: string = authHeader?.split(" ")[1] as string
    jwt.verify(token, process.env.JWT_SECRET as string)

    return next()
  } catch (error) {
    res.status(METHOD_NOT_ALLOWED)
    return res.json({
      error: "JWT token not provided. Please provide a valid JWT",
    })
  }
}

export const IsOwner = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    const token: string = authHeader?.split(" ")[1] as string
    const valid = jwt.verify(token, process.env.JWT_SECRET as string)

    const info: JwtPayload = valid as JwtPayload

    if (parseInt(req.params.id) !== info.id) {
      return res.json({ error: "Not Authorized to perform this action." })
    }
    return next()
  } catch (error) {
    return res.json({ error: "User not authorized for this action" })
  }
}