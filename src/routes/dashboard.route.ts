import express from "express"
import { orderItems, usersOrders } from "../controllers/dashboard.controller"

const dashboard_route = (app: express.Application): void => {
  app.get("/orders/:id/order_items", orderItems)
  app.get("/user_orders", usersOrders)
}

export default dashboard_route
