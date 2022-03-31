import { PoolClient, QueryResult } from "pg"
import { Order } from "../interfaces/orders.interface"
import Client from "../database/database"
import { OrderItems } from "../interfaces/order_items.interface"
import { DataObject } from "../interfaces/common.interface"
import { NOT_FOUND, OK } from "http-status-codes"

export class OrdersModel {
  async index(): Promise<DataObject> {
    try {
      const conn: PoolClient = await Client.connect()
      const sql: string = "SELECT * from orders"
      const result: QueryResult<Order> = await conn.query(sql)

      conn.release()

      const data: DataObject = {
        status: result.rows.length > 0 ? OK : NOT_FOUND,
        data:
          result.rows.length > 0 ? result.rows : { error: "No Records found" },
      }
      return data

      return data
    } catch (error) {
      throw new Error(`Unable to find results. ${error}`)
    }
  }

  async create(order: Order): Promise<DataObject> {
    try {
      const conn: PoolClient = await Client.connect()
      const sql: string =
        "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *"
      const result: QueryResult<Order> = await conn.query(sql, [
        order.user_id,
        order.status,
      ])

      const data: DataObject = {
        status: result.rows.length > 0 ? OK : NOT_FOUND,
        data:
          result.rows.length > 0
            ? result.rows[0]
            : { error: "No Records found" },
      }
      return data
    } catch (error) {
      throw new Error(`Unable to create order. ${error}`)
    }
  }

  async show(id: number): Promise<DataObject> {
    try {
      const conn: PoolClient = await Client.connect()
      const sql = "SELECT * FROM orders WHERE id = $1"

      const result: QueryResult<Order> = await conn.query(sql, [id])

      const data: DataObject = {
        status: result.rows.length > 0 ? OK : NOT_FOUND,
        data:
          result.rows.length > 0
            ? result.rows[0]
            : { error: "No Records found" },
      }
      return data
    } catch (error) {
      throw new Error(`Unable to find order with the id. ${id}`)
    }
  }

  async update(id: number, order: JSON): Promise<DataObject> {
    const keys: string = Object.keys(order).join(",")

    const values: string[] = Object.values(order)

    const indices = Object.keys(order)
      .map((obj, index) => {
        return "$" + (index + 1)
      })
      .join(",")

    try {
      const conn: PoolClient = await Client.connect()
      const sql: string = `UPDATE orders SET (${keys})=(${indices}) WHERE id=${id} RETURNING *`

      const result: QueryResult<Order> = await conn.query(sql, values)

      console
      const data: DataObject = {
        status: result.rows.length > 0 ? OK : NOT_FOUND,
        data:
          result.rows.length > 0
            ? result.rows[0]
            : { error: "No Records found" },
      }
      return data
    } catch (error) {
      throw new Error(`Unable to find order with the id. ${id}`)
    }
  }

  async delete(id: number): Promise<DataObject> {
    try {
      const conn = await Client.connect()
      const sql = "DELETE FROM orders WHERE id=$1 RETURNING *"
      const result: QueryResult<Order> = await conn.query(sql, [id])
      conn.release()

      const data: DataObject = {
        status: result.rows.length > 0 ? OK : NOT_FOUND,
        data:
          result.rows.length > 0
            ? result.rows[0]
            : { error: "No Records found" },
      }
      return data
    } catch (error) {
      throw new Error(`Cannot get order ${error}`)
    }
  }

  async addProducts(
    order_id: number,
    product_id: number,
    quantity: number
  ): Promise<DataObject> {
    try {
      const conn = await Client.connect()
      const sql =
        "INSERT INTO order_items (order_id, product_id, quantity) values ($1, $2, $3) RETURNING *"

      const result: QueryResult<OrderItems> = await conn.query(sql, [
        order_id,
        product_id,
        quantity,
      ])

      conn.release()

      const data: DataObject = {
        status: result.rows.length > 0 ? OK : NOT_FOUND,
        data:
          result.rows.length > 0
            ? result.rows[0]
            : { error: "No Records found" },
      }
      return data
    } catch (error) {
      throw new Error(`Cannot add products to order ${error}`)
    }
  }

  async clean(): Promise<boolean> {
    const sql: string = "TRUNCATE TABLE orders RESTART IDENTITY CASCADE"
    try {
      const conn: PoolClient = await Client.connect()
      const result: QueryResult<Order> = await conn.query(sql)

      conn.release()

      return true
    } catch (error) {
      throw new Error(`Unable to Update: ${error}`)
    }
  }
}
