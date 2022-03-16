import supertest from "supertest"

import { Book, BookStore } from "../../models/books.model";

const store : BookStore = new BookStore()
describe("Books Model", () => {
    it("Ensures that a function is defined", ()=> {
        expect(store.index).toBeDefined();
    })
    it("Checks the function executes successfully", async () => {
        const result : Book[] = await store.index();
        expect(result).toEqual([]);
    })
})
