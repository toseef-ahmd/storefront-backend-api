import supertest from "supertest"

import { ProductModel} from "../../models/products.model";
import { Product } from "../../interfaces/products.interface";

const model = new ProductModel()

describe("Product Model", () => {
  it('Should have an index method', () => {
    expect(model.index).toBeDefined();
  });

  it('Should have a show method', () => {
    expect(model.index).toBeDefined();
  });

  it('Should have a create method', () => {
    expect(model.index).toBeDefined();
  });

  it('Should have a update method', () => {
    expect(model.index).toBeDefined();
  });

  it('Should have a delete method', () => {
    expect(model.index).toBeDefined();
  });

  it('Should add a Product', async () => {
    const result: Product = await model.create({
        title: "Harry Potter",
        price: 100,
        category : 'Books',
        details : 'This is a book'
      });
    
    expect(result).toEqual({
      id: 1,
      title: "Harry Potter",
      price: ('100' as unknown) as number,
      category : 'Books',
      details : 'This is a book'
    });
  });

  it('Should return a list of Products', async () => {
    const result = await model.index();
    expect(result).toEqual([{
        id: 1,
        title: "Harry Potter",
        price: ('100' as unknown) as number,
        category : 'Books',
        details : 'This is a book'
    }]);
  });

  it('Should return the correct Product', async () => {
    const result = await model.show("1");
    expect(result).toEqual({
        id: 1,
        title: "Harry Potter",
        price: ('100' as unknown) as number,
        category : 'Books',
        details : 'This is a book'
    });
  });

  it('Should remove the Product', async () => {
    model.delete("1");
    const result = await model.index()

    expect(result).toEqual([]);
  })
});