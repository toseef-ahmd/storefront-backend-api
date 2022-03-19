import express  from "express";
import {create, update, index, show, destroy} from '../controllers/products.controller'

const products_route = (app: express.Application) : void => {
    app.post('/products', create)
    app.get('/products', index)
    app.get('/products/:id', show)
    app.delete('/products', destroy)
    app.patch('/products', update)
}

export default products_route;