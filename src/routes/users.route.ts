import express  from "express";
import {create, update, index, show, destroy, authenticate, clean} from '../controllers/users.controller'
import { IsAuthenticated, IsOwner } from "../middlewares/auth.middleware";

const users_route = (app: express.Application) : void => {
    app.post('/users', create)
    app.get('/users', IsAuthenticated, index)
    app.get('/users/authenticate', authenticate)
    app.get('/users/:id', IsAuthenticated, show)
    app.delete('/users/:id', IsAuthenticated, destroy)
    
    app.put('/users/:id', IsAuthenticated, update)
    //Just to clean table during testing
    app.delete('/users', clean)
}

export default users_route;