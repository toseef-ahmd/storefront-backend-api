import express from "express"
import { orderItems, usersOrders } from "../controllers/dashboard.controller"

const dashboard_route = (app: express.Application) => {
  app.get("/order_items", orderItems)
  app.get("/user_orders", usersOrders)
}

export default dashboard_route
