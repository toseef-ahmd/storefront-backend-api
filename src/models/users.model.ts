import { PoolClient, QueryResult, ResultBuilder } from "pg";
import Client from "../database/database";
import bcrypt from 'bcrypt'
import { User } from "../interfaces/users.interface";

export class UserModel {
    async authenticate (email : string, password : string) : Promise<User> {
        const sql : string = 'SELECT * FROM users WHERE email=$1'
        const conn : PoolClient = await Client.connect();
        const result : QueryResult<User> = await Client.query(sql, [email]);
        const {rows} = result
        
       if (rows.length > 0) {
        const user : User = rows[0];
        const pepper : string = process.env.PASSWORD_HASH as string;
        if(bcrypt.compareSync(password + pepper, user.password))

       } 
    }

    async index () : Promise<User[]> {
        try {
            const conn : PoolClient = await Client.connect();
            const sql : string = 'SELECT * FROM users';
            const result : QueryResult<User> = await conn.query(sql);
            conn.release()

            return result.rows;

        } catch (error) {
            throw new Error(`Unable to find Results: ${error}`)
        }
    }

    async  create(user:User) : Promise<User> {
      try {
        const conn : PoolClient= await Client.connect();
        const sql : string = 'INSERT INTO USER (email, password, phone, username) VALUES ($1, $2, $3, $4)'
        const pepper : string = process.env.PASSWORD_HASH as string
        const salt : string = process.env.SALT_ROUNDS as string
        const hash : string = bcrypt.hashSync(user.password + pepper, parseInt(salt));

        const result : QueryResult<User> = await conn.query(sql, [user.email, hash, user.phone, user.username]);

        return result.rows[0];
      } catch (error) {
        throw new Error(`Unable to find Results: ${error}`)
      }
   }

    async show(id: number): Promise<User> {
        try {
            const sql : string = 'SELECT * FROM users WHERE id=$1'
            const conn : PoolClient = await Client.connect();
            const result : QueryResult<User> = await conn.query(sql, [id]);
            conn.release();
            
            return result.rows[0];

        } catch (error) {
            throw new Error(`Unable to find Results: ${error}`)
        }
    }

    async delete(id : Number) : Promise<User> {
        try {
            const sql : string = 'DELETE FROM users WHERE id=$1'
            const conn : PoolClient = await Client.connect();
            const result : QueryResult<User> = await conn.query(sql, [id]);
            
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Unable to find Results: ${error}`)
        }
    }
}