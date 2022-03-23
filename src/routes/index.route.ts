import express from 'express';
import dashboard_route from './dashboard.route';
import orders_route from './orders.route';
import products_route from './products.route';
import users_route from './users.route';

export const AppRoutes = (app: express.Application) : void => {
    
    products_route(app);
    users_route(app);
    orders_route(app);
    dashboard_route(app)
}
