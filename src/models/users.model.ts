import { QueryResult } from "pg";
import Client from "../database/database";
import bcrypt from 'bcrypt'
import { User } from "../interfaces/users.interface";

export class UserModel {
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
        const sql = 'INSERT INTO USER (email, password, phone, username) VALUES ($1, $2, $3, $4)'
        const pepper : string = 'pepper'
        const hashSteps = process.env.SALT_ROUNDS as string
        const hash = bcrypt.hashSync(user.password + pepper, parseInt(hashSteps));

        const result : QueryResult<User> = await conn.query(sql, [user.email, hash, user.phone, user.username]);

        return result.rows[0];
      } catch (error) {
        throw new Error(`Unable to find Results: ${error}`)
      }
   }


    async show(id: number): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'
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