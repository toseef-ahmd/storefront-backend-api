import { Request, Response } from "express"
import { ProductModel } from "../models/products.model"
import { Product } from "../interfaces/products.interface"
import { NOT_FOUND } from "http-status-codes"
import { DataObject } from "../interfaces/common.interface"

const model: ProductModel = new ProductModel()

export const index = async (req: Request, res: Response) : Promise<void> => {
  try {
    const products: DataObject = await model.index()

    res.status(products.status)
    res.json(products.data)
  } catch (error) {
    res.status(NOT_FOUND)
    res.json(error)
  }
}

export const show = async (req: Request, res: Response) : Promise<void> => {
  try {
    const product: DataObject = await model.show(req.params.id)

    res.status(product.status)
    res.json(product.data)
  } catch (error) {
    res.status(NOT_FOUND)
    res.json(error)
  }
}

export const create = async (req: Request, res: Response) : Promise<void> => {
  //console.log('request: ', req)
  const product: Product = {
    name: req.body.name,
    price: req.body.price as unknown as number,
    category: req.body.category,
  }

  try {
    const newProduct: DataObject = await model.create(product)
    res.status(newProduct.status)
    res.json(newProduct.data)
  } catch (error) {
    res.status(NOT_FOUND)
    res.json(error)
  }
}

export const destroy = async (req: Request, res: Response) : Promise<void> => {
  try {
    const deleted: DataObject = await model.delete(parseInt(req.params.id))
    res.status(deleted.status)
    res.json(deleted.data)
  } catch (error) {
    res.status(NOT_FOUND)
    res.json(error)
  }
}

export const update = async (req: Request, res: Response) : Promise<void> => {
  try {
    const product: JSON = req.body as JSON
    const updated: DataObject = await model.update(
      parseInt(req.params.id),
      product
    )

    res.status(updated.status)
    res.json(updated.data)
  } catch (error) {
    res.status(NOT_FOUND)
    res.json(error)
  }
}

export const clean = async (req: Request, res: Response) : Promise<void> => {
  try {
    const deleted: boolean = await model.clean()

    res.status(200)
    res.json({ deleted: deleted })
  } catch (error) {
    res.status(NOT_FOUND)
    res.json(error)
  }
}
