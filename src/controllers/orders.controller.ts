import { Request, Response } from "express";
import { Order } from "../interfaces/orders.interface";
import { OrderItems } from "../interfaces/order_items.interface";
import { OrdersModel } from "../models/orders.model";

const ordersModel : OrdersModel = new OrdersModel();

export const index = async (req : Request, res: Response) : Promise<void> => {
    const orders : Order[] = await ordersModel.index();

    res.json(orders);
}

export const create = async (req: Request, res : Response) => {
    
    const _order : Order = {
        user_id : req.body.user_id as number,
        status : req.body.status,
    }
    const newOrder : Order = await ordersModel.create(_order);

    res.json(newOrder);
}

export const show = async (req: Request, res : Response) : Promise<void> => {

    const order = await ordersModel.show(parseInt(req.params.id));

    res.json(order);
}

export const update = async (req: Request, res : Response) : Promise<void> => {
    const _order : JSON = req.body as JSON;

    const order = await ordersModel.update(parseInt(req.params.id), _order);

    res.json(order);
}

export const destroy = async (req : Request, res : Response) : Promise<void> => {
    try {
        const deleted : Order = await ordersModel.delete(parseInt(req.params.id));

        res.json(deleted);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

export const addProducts = async (req: Request, res : Response) => {
    const orderId : number = parseInt(req.params.id);
    const productId : number = req.body.product_id;
    const quantity : number = req.body.quantity;

    try {
        const order_items : OrderItems = await ordersModel.addProducts(orderId, productId, quantity);

        res.json(order_items);

    } catch (error) {
        res.status(400)
        res.json(error)
    }
   

}
