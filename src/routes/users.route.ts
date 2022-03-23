import express  from "express";
import {create, update, index, show, destroy, authenticate} from '../controllers/users.controller'
import { IsAuthenticated, IsOwner } from "../middlewares/auth.middleware";

const users_route = (app: express.Application) : void => {
    app.post('/users', create)
    app.get('/users', index)
    app.get('/users/authenticate', authenticate)
    app.get('/users/:id', IsAuthenticated, show)
    app.delete('/users/:id', IsAuthenticated, IsOwner, destroy)
    app.patch('/users/:id', IsAuthenticated, IsOwner, update)
}

export default users_route;