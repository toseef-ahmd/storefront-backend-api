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
    let _token : string;

    beforeAll(async () => {
        const user : User = {
            firstname : 'tauseef',
            lastname : 'Ahmed',
            username : 'tasueefAhmed',
            password_digest : 'hello123'
        }

        const result = await request.post('/users').send(user);

        const {token} = result.body;
        _token = token;

        //console.log("token: ", _token);
        const result1 = await request.post('/products').send(product).set('Authorization', 'Bearer '+_token)
    })

    afterAll(async () => {

        await request.delete('/users');
        await request.delete('/products');
    })

    it('Should Return error if Auth Token is missing', () => {
        request.post('/products').send(product)
        .then((res)=> {
            expect(res.status).toBe(405);
        })

        request.put('/products/1').send({
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

    it('Should create a new Product', async() => {
        const response = await request.post('/products').send(product).set("Authorization", 'Bearer '+_token)

        expect(response.status).toBe(200);
        
    })

    it('Gets Products list', async() => {
        const response = await request.get('/products').set('Accept', 'application/json, text/javascript, */*; q=0.01')
         expect(response.status).toBe(200);
    })
    
    it('Gets specific Product ', async() => {
        const response = await request.get('/products/1')
        .set('Accept', 'application/json, text/javascript, */*; q=0.01')

        expect(response.status).toBe(200);
    })

    it('Should Update the Product', async() => {
        const response = await request.put('/products/1')
        .send({
            name : 'Updated Name'
        })
        .set('Authorization', 'Bearer '+ _token)
        .set('Accept', 'application/json, text/javascript, */*; q=0.01')
        
        expect(response.status).toBe(200);
    })
    
    it('Should Delete the Product', async () => {
        const response = await request.delete('/products/1')
        .set('Authorization', 'Bearer '+ _token)
        .set('Accept', 'application/json, text/javascript, */*; q=0.01')

        expect(response.status).toBe(200);
     }) 
})

    



