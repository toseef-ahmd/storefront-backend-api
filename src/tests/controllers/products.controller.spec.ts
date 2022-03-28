import supertest from "supertest";
import jwt, { Secret } from "jsonwebtoken";
import { app } from "../../server";
import { Product } from "../../interfaces/products.interface";
import { User } from "../../interfaces/users.interface";

const request : supertest.SuperTest<supertest.Test> = supertest(app);

const JWT_SECRET : Secret = process.env.JWT_SECRET as Secret

describe('Products Controller', () => {
    const product : Product = {
        name : 'Harry Potter',
        price : 100,
        category : 'Books'
    }

    let _id : number;
    let token : string;

    beforeAll(async () => {
        const user : User = {
            firstname : 'Tauseef',
            lastname : 'Ahmed',
            username : 'tasueefAhmed',
            password_digest : 'hello123'
        }

        const result = await request.post('/users').send(user);

        token = result.body;
    })

    afterAll(async () => {

        const result = await request.delete('/users');

    })

    it('Should Return error if Auth Token is missing', () => {
        request.get('/products').then((res)=> {
            expect(res.status).toBe(405);
        })

        request.get('/products/1').then((res)=> {
            expect(res.status).toBe(405);
        })

        request.patch('/products/1')
        .send({
            name : 'Updated name',
            price : 200
        })
        .then((res)=> {
            expect(res.status).toBe(405);
        })

        request.delete('/products/1').then((res)=> {
            expect(res.status).toBe(405);
        })
    })

    it('Should create a new Product', () => {
        request.post('/products')
        .send({product})
        .then((res)=> { 
            expect((res.status)).toBe(200);
        })
    })

    it('Gets Products list', () => {
        request.get('/products').set("Authorization", "bearer "+ token)
        .then((res)=> {
            expect(res.status).toBe(200);
        })
    })
    
    it('Gets specific Product ', () => {
        request.get('/products/1').set("Authorization", "bearer "+ token)
        .then((res)=> {
            expect(res.status).toBe(200);
        })
    })

    it('Should Update the Product', () => {
        request.put('/products/1').set('Authorization', "bearer "+ token)
        .send({
            name : 'Updated Name',
            prrice : 200        
        })
        .then((res) => {
            expect(res.status).toBe(200);
        })
    })
    
    it('Should Delete the Product', () => {
        request.delete('/products/1').set('Authorization', "bearer "+ token)
        .then((res) => {
            expect(res.status).toBe(200);
        })
     }) 
})

    



