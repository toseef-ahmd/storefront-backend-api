import express from "express"
import {
  create,
  index,
  update,
  show,
  destroy,
  addProducts,
  clean,
} from "../controllers/orders.controller"
import { IsAuthenticated } from "../middlewares/auth.middleware"

const orders_route = (app: express.Application): void => {
  app.get("/orders", index)
  app.get("/orders/:id", IsAuthenticated, show)
  app.post("/orders/", IsAuthenticated, create)
  app.put("/orders/:id", IsAuthenticated, update)
  app.delete("/orders/:id", IsAuthenticated, destroy)
  app.delete("/orders", clean)
  app.post("/orders/:id/products", IsAuthenticated, addProducts)
}

export default orders_route
