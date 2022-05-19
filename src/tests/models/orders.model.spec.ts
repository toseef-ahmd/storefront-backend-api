import { OrdersModel } from "../../models/orders.model"
import { DataObject } from "../../interfaces/common.interface"
import { UserModel } from "../../models/users.model"
import { ProductModel } from "../../models/products.model"

const model = new OrdersModel()
const userModel = new UserModel()
const prodModel = new ProductModel()

describe("Orders Model", () => {
  beforeAll(async () => {
    await userModel.create({
      username: "tauseef123",
      firstname: "tauseef",
      lastname: "ahmed",
      password_digest: "password123",
    })

    await prodModel.create({
      name: "Harry Potter",
      price: 10,
      quantity: 10,
      details: "This is a harry potter book.",
      rating: 5,
      avatar: "https://res.cloudinary.com/atkora/image/upload/v1650995531/29056083._SY475__qwmwfw.jpg"
    })
  })

  afterAll(async () => {
    await userModel.clean()
    await prodModel.clean()
  })

  it("Should have an index method", () => {
    expect(model.index).toBeDefined()
  })

  it("Should have a show method", () => {
    expect(model.show).toBeDefined()
  })

  it("Should have a create method", () => {
    expect(model.create).toBeDefined()
  })

  it("Should have a update method", () => {
    expect(model.update).toBeDefined()
  })

  it("Should have a delete method", () => {
    expect(model.delete).toBeDefined()
  })

  it("Should have a addProducts method", () => {
    expect(model.addProducts).toBeDefined()
  })

  it("Should add an Order", async () => {
    const result: DataObject = await model.create({
      user_id: 1,
      status: "active",
    })

    expect(result.data).toEqual({
      id: 1,
      user_id: "1",
      status: "active",
    })
  })

  it("Should return a list of Orders", async () => {
    const result: DataObject = await model.index()

    expect(result.data).toEqual([
      {
        id: 1,
        user_id: "1",
        status: "active",
      },
    ])
  })

  it("Should return the correct Order", async () => {
    const result = await model.show(1)

    expect(result.data).toEqual({
      id: 1,
      user_id: "1",
      status: "active",
    })
  })

  it("Should Update a specific Order", async () => {
    const update: JSON = <JSON>(<unknown>{
      status: "shipped",
    })

    const result: DataObject = await model.update(1, update as JSON)

    expect(result.data).toEqual({
      id: 1,
      user_id: "1",
      status: "shipped",
    })
  })

  it("Should remove the Order", async () => {
    const result: DataObject = await model.delete(1)

    expect(result.data).toEqual({
      id: 1,
      user_id: "1",
      status: "shipped",
    })
  })
})
