import { PoolClient, QueryResult } from "pg";
import Client from "../database/database"
import {Product} from '../interfaces/products.interface'

export class ProductModel {
   async index() : Promise<Product[]> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result : QueryResult<Product> = await connection.query(sql);
            connection.release();
            
            return result.rows;

        } catch (error) {
            throw new Error(`Cannot get products ${error}`);
        }
    }

    async create(prod:Product) : Promise<Product> {
        try {
            
            const conn = await Client.connect();
           
            const sql = 'INSERT INTO products (title, price, category, details) VALUES ($1, $2, $3, $4) RETURNING *';
            const newprod = await conn.query(sql, [prod.title, prod.price, prod.category, prod.details]);
            
            conn.release();
            
            return newprod.rows[0];
    
        } catch (error) {
          throw new Error(`Cannot get product ${error}`);
        }
    }

    async show(id:string) : Promise<Product>  {
        try {
            
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products WHERE id=$1'
            const result : QueryResult<Product> = await conn.query(sql, [parseInt(id)]);
            conn.release();
            
            return result.rows[0];

        } catch (error) {
            throw new Error(`Cannot get product ${error}`);
        }
    }
   
    async delete(id:number) : Promise<Product>  {
        try {

            const conn = await Client.connect();
            const sql = 'DELETE FROM products WHERE id=$1'
            const result : QueryResult<Product> = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];

        } catch (error) {
        throw new Error(`Cannot get product ${error}`);
        }
    }

    async update(id: number, product : JSON) : Promise<Product> {
        const keys : string = Object.keys(product).join(',');
        const values : string[] = Object.values(product);
        
        const indices : string = Object.keys(product).map((obj, index) => {
            return '$'+(index+1);
        }).join(',');

        const sql : string = `UPDATE products SET (${keys})=(${indices}) WHERE id=${id} RETURNING *`;
        
        try {
            const conn : PoolClient = await Client.connect();
            const result : QueryResult<Product> = await conn.query(sql, values);

            conn.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(`Unable to Update: ${error}`)
        }
    }

}

