import { Request, Response } from "express"

import { Dashboard } from "../services/dashboard.service"

const dashboard = new Dashboard()

export const orderItems = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await dashboard.orderItems()
    res.json(products)
  } catch (error) {
    throw new Error("Unable to find Results. " + error)
  }
}

export const usersOrders = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    //console.log(_req);
    const _orders = await dashboard.userOrders()
    res.json(_orders)
  } catch (error) {
    throw new Error("Unable to find Results. " + error)
  }
}
