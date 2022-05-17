import { Request, Response } from "express"
import { Dashboard } from "../services/dashboard.service"
import jwt from 'jsonwebtoken'

const dashboard = new Dashboard()

export const orderItems = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await dashboard.orderItems(parseInt(_req.params.id))
    res.json(products)
  } catch (error) {
    throw new Error("Unable to find Results. " + error)
  }
}

export const usersOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization
    const token: string = authHeader?.split(" ")[1] as string
    const valid = jwt.verify(token, process.env.JWT_SECRET as string)

    for (const [key, value] of Object.entries(valid)) {
      if (key == "id") {
        const _orders = await dashboard.userOrders(value as number)
        res.json(_orders)
      }
    }
  } catch (error) {
    throw new Error("Unable to find Results. " + error)
  }
}
