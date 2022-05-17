import express from "express"
import {
  create,
  update,
  index,
  show,
  destroy,
  clean,
  filter,
  load

} from "../controllers/products.controller"
import { IsAuthenticated } from "../middlewares/auth.middleware"

const products_route = (app: express.Application): void => {
  app.post("/products", IsAuthenticated, create)
  app.get("/products", index)
  app.get("/products/filter", filter)
  app.get("/products/:id", show)
  app.delete("/products/:id", IsAuthenticated, destroy)
  app.patch("/products/:id", IsAuthenticated, update)
  app.delete("/products", clean)
  app.post('/products/load/', load)
}

export default products_route
