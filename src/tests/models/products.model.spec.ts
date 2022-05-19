import { ProductModel } from "../../models/products.model"
import { DataObject } from "../../interfaces/common.interface"

const model = new ProductModel()

describe("Product Model", () => {
  it("Should have an index method", () => {
    expect(model.index).toBeDefined()
  })

  it("Should have a show method", () => {
    expect(model.index).toBeDefined()
  })

  it("Should have a create method", () => {
    expect(model.index).toBeDefined()
  })

  it("Should have a update method", () => {
    expect(model.index).toBeDefined()
  })

  it("Should have a delete method", () => {
    expect(model.index).toBeDefined()
  })

  it("Should add a Product", async () => {
    const result: DataObject = await model.create({
      name: "Harry Potter",
      price: 10,
      quantity: 10,
      details: "This is a harry potter book.",
      rating: 5,
      avatar: "https://res.cloudinary.com/atkora/image/upload/v1650995531/29056083._SY475__qwmwfw.jpg"
    })

    expect(result.data).toEqual({
      id: 1,
      name: "Harry Potter",
      price: 10,
      quantity: 10,
      details: "This is a harry potter book.",
      rating: 5,
      avatar: "https://res.cloudinary.com/atkora/image/upload/v1650995531/29056083._SY475__qwmwfw.jpg"
    })
  })

  it("Should return a list of Products", async () => {
    const result: DataObject = await model.index()

    expect(result.data).toEqual([
      {
        id: 1,
        name: "Harry Potter",
        price: 10,
        quantity: 10,
        details: "This is a harry potter book.",
        rating: 5,
        avatar: "https://res.cloudinary.com/atkora/image/upload/v1650995531/29056083._SY475__qwmwfw.jpg"
      },
    ])
  })

  it("Should return the correct Product", async () => {
    const result = await model.show("1")
    expect(result.data).toEqual({
      id: 1,
      name: "Harry Potter",
      price: 10,
      quantity: 10,
      details: "This is a harry potter book.",
      rating: 5,
      avatar: "https://res.cloudinary.com/atkora/image/upload/v1650995531/29056083._SY475__qwmwfw.jpg"
    })
  })

  it("Should Update the Product", async () => {
    const update: JSON = <JSON>(<unknown>{
      name: "Updated Name",
      price: 200,
    })

    const result: DataObject = await model.update(1, update as JSON)

    expect(result.data).toEqual({
      id: 1,
      name: "Updated Name",
      price: 200,
      quantity: 10,
      details: "This is a harry potter book.",
      rating: 5,
      avatar: "https://res.cloudinary.com/atkora/image/upload/v1650995531/29056083._SY475__qwmwfw.jpg"
    })
  })

  it("Should remove the Product", async () => {
    const result: DataObject = await model.delete(1)

    expect(result.data).toEqual({
      id: 1,
      name: "Updated Name",
      price: 200,
      quantity: 10,
      details: "This is a harry potter book.",
      rating: 5,
      avatar: "https://res.cloudinary.com/atkora/image/upload/v1650995531/29056083._SY475__qwmwfw.jpg"
    })
  })
})
