import supertest from "supertest"
import { app } from "../../server"
import { User } from "../../interfaces/users.interface"
import { Order } from "../../interfaces/orders.interface"
import { Product } from "../../interfaces/products.interface"

const request = supertest(app)

const _token: string = process.env.token as string

describe("Orders Controller", () => {
  const user: User = {
    firstname: "tauseef",
    lastname: "ahmed",
    username: "tasueefAhmed",
    password_digest: "hello123",
  }

  const order: Order = {
    user_id: 1,
    status: "active",
  }

  const product: Product = {
    name: "Harry Potter",
    price: 100,
    category: "Books",
  }

  beforeAll(async () => {
    //Create new user
    await request.post("/users").send(user)

    //Create new product
    await request
      .post("/products")
      .send(product)
      .set("Authorization", "Bearer " + _token)
  })

  afterAll(async () => {
    await request.delete("/products")
    await request.delete("/users")
    await request.delete("/orders")
  })

  afterAll(async () => {
    await request.delete("/users")
  })

  it("Should Return error if Auth Token is missing", async () => {
    await request.get("/orders/1").then((res) => {
      expect(res.status).toBe(405)
    })

    await request
      .put("/orders/1")
      .send({
        status: "updated",
      })
      .then((res) => {
        expect(res.status).toBe(405)
      })

    await request.delete("/orders/1").then((res) => {
      expect(res.status).toBe(405)
    })
  })

  it("Should create a new order", async () => {
    const response = await request
      .post("/orders")
      .send(order)
      .set("Authorization", "Bearer " + _token)

    expect(response.status).toBe(200)
  })

  it("Gets Orders List", async () => {
    const response = await request
      .get("/orders")
      .set("Authorization", "Bearer " + _token)

    expect(response.status).toBe(200)
  })

  it("Gets specific Order ", async () => {
    const response = await request
      .get("/orders/1")
      .set("Authorization", "Bearer " + _token)

    expect(response.status).toBe(200)
  })

  it("Should Update the Order", async () => {
    const response = await request
      .put("/orders/1")
      .send({
        status: "Updated",
      })
      .set("Authorization", "Bearer " + _token)

    expect(response.status).toBe(200)
  })
  it("Should Delete the Order", async () => {
    const response = await request
      .delete("/orders/1")
      .set("Authorization", "Bearer " + _token)

    expect(response.status).toBe(200)
  })
})
