import express from 'express';
import products_route from './products.route';
import users_route from './users.route';

export const AppRoutes = (app: express.Application) : void => {
    
    products_route(app);
    users_route(app);
}
