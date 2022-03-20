import express  from "express";
import {create, update, index, show, destroy, authenticate} from '../controllers/users.controller'

const users_route = (app: express.Application) : void => {
    app.post('/users', create)
    app.get('/users', index)
    app.get('/users/authenticate', authenticate)
    app.get('/users/:id', show)
    app.delete('/users/:id', destroy)
    app.patch('/users/:id', update)
}

export default users_route;