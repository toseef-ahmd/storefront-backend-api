import supertest from "supertest";
import jwt, { Secret } from "jsonwebtoken";
import { app } from "../../server";
import { User } from "../../interfaces/users.interface";

const request : supertest.SuperTest<supertest.Test> = supertest(app);

const JWT_SECRET : Secret = process.env.JWT_SECRET as Secret

describe('Users Controller', () => {
    const user : User = {
        firstname : 'tauseef',
        lastname : 'ahmed',
        username : 'tasueefAhmed',
        password_digest : 'hello123'
    }

    let _id : number;
    let token : string;

    
    afterAll(async () => {

        await request.delete('/users');

    })

    it('Should Return error if Auth Token is missing', () => {
        request.get('/users').then((res)=> {
            expect(res.status).toBe(405);
        })

        request.get('/users/1').then((res)=> {
            expect(res.status).toBe(405);
        })

        request.patch('/users/1')
        .send({
            firstname : user.firstname+'update',
            lastname : user.lastname+'update'
        })
        .then((res)=> {
            expect(res.status).toBe(405);
        })

        request.delete('/users/1').then((res)=> {
            expect(res.status).toBe(405);
        })
    })

    it('Should return a token as a new token is created', () => {
        request.post('/users')
        .send({user})
        .then((res)=> {
            token  = res.body;
            
            const data = jwt.verify(token, JWT_SECRET);
            let temp;
            for (let [key, value] of Object.entries(data)) {
            if(key==='id') {_id = value}
        }

            console.log(_id);
            expect((res.status)).toBe(200);
        })
    })

    it('Gets Users list', () => {
        request.get('/users').set("Authorization", "bearer "+ token)
        .then((res)=> {
            
            expect(res.status).toBe(200);
        })
    })
    
    it('Gets specific User ', () => {
        request.get(`/users/${_id}`).set("Authorization", "bearer "+ token)
        .then((res)=> {
            expect(res.status).toBe(200);
        })
    })

    it('Should Update the User', () => {
        request.put(`/users/${_id}`).set('Authorization', "bearer "+ token)
        .send({
            firstname : "newFirstName",
            lastname : "newLastName"        
        })
        .then((res) => {
            expect(res.status).toBe(200);
        })
    })
    
    it('Should return error if login information is incorrect', () => {
        request.get('/users/authenticate').set('Authorization', "bearer "+ token)
        .send({
            username: user.username,
            password : 'wrongpassword'
        })
        .then((res) => {
            expect(res.status).toBe(404);
        })
    })
    it('Should Delete the User', () => {
        request.delete(`/users/${_id}`).set('Authorization',  "bearer "+ token)
        .then((res)=> {
            expect(res.status).toBe(200);
        })
     }) 
})

    



