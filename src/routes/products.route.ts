import express from "express"
import {
  create,
  update,
  index,
  show,
  destroy,
  clean,
} from "../controllers/products.controller"
import { IsAuthenticated } from "../middlewares/auth.middleware"

const products_route = (app: express.Application): void => {
  app.post("/products", IsAuthenticated, create)
  app.get("/products", index)
  app.get("/products/:id", show)
  app.delete("/products/:id", IsAuthenticated, destroy)
  app.put("/products/:id", IsAuthenticated, update)
  app.delete("/products", clean)
}

export default products_route
