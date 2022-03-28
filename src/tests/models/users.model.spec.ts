import supertest from "supertest"

import { UserModel} from "../../models/users.model";
import { User } from "../../interfaces/users.interface";
import { DataObject } from "../../interfaces/common.interface";

const model = new UserModel()

describe("Users Model", () => {
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

  it('Should add a User', async () => {
    const result: DataObject = await model.create({
        username: "tauseef123",
        firstname : "tauseef",
        lastname : "ahmed",
        password_digest : "password123"
      });
    
    expect(result.data).toEqual({
        id: 1,
        username: "tauseef123",
        firstname : "tauseef",
        lastname : "ahmed"
    });
  });

  it('Should return a list of Users', async () => {
    const result : DataObject = await model.index();

    expect(result.data).toEqual([{
        id: 1,
        username: "tauseef123",
        firstname : "tauseef",
        lastname : "ahmed"
    }]);
  });

  it('Should return the correct User', async () => {
    const result = await model.show(1);
    expect(result.data).toEqual({
        id: 1,
        username: "tauseef123",
        firstname : "tauseef",
        lastname : "ahmed"
    });
  });

  it('Should Update a specific User', async () => {

    const update : Object = {
      "username" : "UpdatedName",
    }
    model.update(2, update as JSON);
    const result : DataObject = await model.update(1, update as JSON)

    expect(result.data).toEqual({
        id: 1,
        username: "UpdatedName",
        firstname : "tauseef",
        lastname : "ahmed"
  });
  })
  
  it('Should remove the User', async () => {
    
    const result : DataObject = await model.delete(1);

    expect(result.data).toEqual({ 
        id: 1,
        username: "UpdatedName",
        firstname : "tauseef",
        lastname : "ahmed"
    });
  })
});