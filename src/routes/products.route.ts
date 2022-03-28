import express  from "express";
import {create, update, index, show, destroy} from '../controllers/products.controller'
import { IsAuthenticated } from "../middlewares/auth.middleware";

const products_route = (app: express.Application) : void => {
    app.post('/products', IsAuthenticated, create)
    app.get('/products', index)
    app.get('/products/:id', show)
    app.delete('/products/:id', IsAuthenticated, destroy)
    app.put('/products/:id', IsAuthenticated, update)
}

export default products_route;