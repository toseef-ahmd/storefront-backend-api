import { Request, Response } from "express"
import { NOT_FOUND } from "http-status-codes"
import { DataObject } from "../interfaces/common.interface"
import { Order } from "../interfaces/orders.interface"

import { OrdersModel } from "../models/orders.model"

const ordersModel: OrdersModel = new OrdersModel()

export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders: DataObject = await ordersModel.index()
    res.status(orders.status)
    res.json(orders.data)
  } catch (error) {
    res.status(NOT_FOUND)
    res.json(error)
  }
}

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const _order: Order = {
      user_id: req.body.user_id as number,
      status: req.body.status,
    }
    const newOrder: DataObject = await ordersModel.create(_order)
    res.status(newOrder.status)
    res.json(newOrder.data)
  } catch (error) {
    res.status(NOT_FOUND)
    res.json(error)
  }
}

export const show = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.params.id)
    const order: DataObject = await ordersModel.show(parseInt(req.params.id))

    res.status(order.status)
    res.json(order.data)
  } catch (error) {
    res.status(NOT_FOUND)
    res.json(error)
  }
}

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const _order: JSON = req.body as JSON
    const order: DataObject = await ordersModel.update(
      parseInt(req.params.id),
      _order
    )

    res.status(order.status)
    res.json(order.data)
  } catch (error) {
    res.status(NOT_FOUND)
    res.json(error)
  }
}

export const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted: DataObject = await ordersModel.delete(
      parseInt(req.params.id)
    )

    res.status(deleted.status)
    res.json(deleted)
  } catch (error) {
    res.status(NOT_FOUND)
    res.json(error)
  }
}

export const addProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const orderId: number = parseInt(req.params.id)
  const productId: number = req.body.product_id
  const quantity: number = req.body.quantity

  try {
    const order_items: DataObject = await ordersModel.addProducts(
      orderId,
      productId,
      quantity
    )

    res.status(order_items.status)
    res.json(order_items.data)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

export const clean = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted: boolean = await ordersModel.clean()

    res.status(200)
    res.json({ deleted: deleted })
  } catch (error) {
    res.status(NOT_FOUND)
    res.json(error)
  }
}
