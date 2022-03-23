import { PoolClient, QueryResult } from "pg";
import { Order } from "../interfaces/orders.interface";
import Client from "../database/database";
import { OrderItems } from "../interfaces/order_items.interface";


export class OrdersModel {
   async index () : Promise<Order[]> {
       try {
        const conn : PoolClient = await Client.connect();
        const sql : string = 'SELECT * from orders'
        const result : QueryResult<Order> =  await conn.query(sql);
     
        conn.release();

        return result.rows;
       } catch (error) {
           throw new Error(`Unable to find results. ${error}`);
        }
    }

    async create (order:Order) : Promise<Order> {
        try {
            const conn : PoolClient = await Client.connect();
            const sql : string = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
            const result : QueryResult<Order> =  await conn.query(sql, [order.user_id, order.status]);
            
            return result.rows[0];

        } catch (error) {
            throw new Error(`Unable to create order. ${error}`);
        }
    }

    async show(id:number) {
        try {
            const conn : PoolClient = await Client.connect();
            const sql : string = 'SELECT * FROM orsders WHERE id = $1';

            const result : QueryResult<Order> = await conn.query(sql, [id]);

            return result.rows[0];

        } catch (error) {
            throw new Error(`Unable to find order with the id. ${id}`);
        }
    }

    async update (id : number, order:JSON) {
        const keys : string = Object.keys(order).join(', ');
        const values : string[] = Object.values(order);

        const indices = Object.keys(order).map((obj, index) => {
            return '$'+(index+1)
        }).join(', ');

        try {
            const conn : PoolClient = await Client.connect();
            const sql : string = `UPDATE orders set (${keys}) = (${indices}) WHERE id=${id}`;

            const result : QueryResult<Order> = await conn.query(sql, values);

            return result.rows[0];
        } catch (error) {
            throw new Error(`Unable to find order with the id. ${id}`);
        }

    }

    async delete (id:number) : Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'DELETE FROM orders WHERE id=$1 RETURNING *'
            const result : QueryResult<Order> = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];

        } catch (error) {
        throw new Error(`Cannot get order ${error}`);
        }

    }

    async addProducts(order_id : number, product_id : number, quantity : number) : Promise<OrderItems> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO order_items (order_id, product_id, quantity) values ($1, $2, $3) RETURNING *';

            const result : QueryResult<OrderItems> = await conn.query(sql, [order_id, product_id, quantity]);
            
            conn.release();

            return result.rows[0];

        } catch (error) {
            throw new Error(`Cannot add products to order ${error}`);
        }
    }
} 