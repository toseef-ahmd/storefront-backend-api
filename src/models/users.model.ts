import { PoolClient, QueryResult } from "pg";
import Client from "../database/database";
import bcrypt from 'bcrypt'
import { User } from "../interfaces/users.interface";

export class UserModel {

    async authenticate (email : string, password : string) : Promise<User | undefined> {
        try {
            const sql : string = 'SELECT * FROM users WHERE email=$1'
            const conn : PoolClient = await Client.connect();
            
            const result : QueryResult<User> = await Client.query(sql, [email]);
            const {rows} = result
            
            if (rows.length > 0) {
                const user : User = rows[0];
                const pepper : string = process.env.PASSWORD_HASH as string;
                if(bcrypt.compareSync(password + pepper, user.password))
                {
                    return user;
                }
                   
            }
        } catch (error) {
           throw new Error(`Not found, ${error}`) 
        }
          
    }

    async index () : Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result : QueryResult<User> = await conn.query(sql);
            conn.release()

            return result.rows;

        } catch (error) {
            throw new Error(`Unable to find Results: ${error}`)
        }
    }

    async  create(user:User) : Promise<User> {
      try {
        const conn = await Client.connect();
        
        const sql = 'INSERT INTO users (email, password, phone, username) VALUES ($1, $2, $3, $4) RETURNING *'
        const pepper : string = 'pepper'
        
        const hashSteps = process.env.SALT_ROUNDS as string
        const hash = bcrypt.hashSync(user.password + pepper, parseInt(hashSteps));

        const result : QueryResult<User> = await conn.query(sql, [user.email, hash, user.phone, user.username]);
        conn.release();
        console.log("result: ", result.rows[0])
        return result.rows[0];
      } catch (error) {
        throw new Error(`Unable to find Results: ${error}`)
      }
   }


    async show(id: number): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=$1'
            const conn = await Client.connect();
            const result : QueryResult<User> = await conn.query(sql, [id]);
            conn.release();
            
            return result.rows[0];

        } catch (error) {
            throw new Error(`Unable to find Results: ${error}`)
        }
    }

    async delete(id : Number) : Promise<User> {
        try {
            const sql = 'DELETE * FROM users WHERE id=($1)'
            const conn = await Client.connect();
            const result : QueryResult<User> = await conn.query(sql, [id]);
            
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Unable to find Results: ${error}`)
        }
    }
}