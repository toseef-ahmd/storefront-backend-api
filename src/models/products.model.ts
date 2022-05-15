import { NO_CONTENT, OK } from "http-status-codes"
import { PoolClient, QueryResult } from "pg"
import Client from "../database/database"
import { DataObject } from "../interfaces/common.interface"
import { Product } from "../interfaces/products.interface"

export class ProductModel {
  async index(): Promise<DataObject> {
    try {
      const connection = await Client.connect()
      const sql = "SELECT * FROM products"
      const result: QueryResult<Product> = await connection.query(sql)
      connection.release()

      const obj: DataObject = {
        status: result.rows.length > 0 ? OK : NO_CONTENT,
        data:
          result.rows.length > 0 ? result.rows : { error: "No Records found" },
      }
      return obj
    } catch (error) {
      throw new Error(`Cannot get products ${error}`)
    }
  }

  async create(prod: Product): Promise<DataObject> {
    try {
      const conn = await Client.connect()
      //console.log(prod);
      const sql =
        "INSERT INTO products (name, price, category, quantity, details, rating, avatar) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *"
      const result = await conn.query(sql, [
        prod.name,
        prod.price,
        "default",
        prod.quantity,
        prod.details,
        5,
        prod.avatar
      ])

      conn.release()
      console.log
      const obj: DataObject = {
        status: result.rows.length > 0 ? OK : NO_CONTENT,
        data:
          result.rows.length > 0
            ? result.rows[0]
            : { error: "No Records found" },
      }
      return obj
    } catch (error) {
      throw new Error(`Cannot get product ${error}`)
    }
  }

  async show(id: string): Promise<DataObject> {
    try {
      const conn = await Client.connect()
      const sql = "SELECT * FROM products WHERE id=$1"
      const result: QueryResult<Product> = await conn.query(sql, [parseInt(id)])
      conn.release()

      const obj: DataObject = {
        status: result.rows.length > 0 ? OK : NO_CONTENT,
        data:
          result.rows.length > 0
            ? result.rows[0]
            : { error: "No Records found" },
      }
      return obj
    } catch (error) {
      throw new Error(`Cannot get product ${error}`)
    }
  }

  async filter(params: JSON): Promise<DataObject> {
    const keys: string = Object.keys(params).join(",")
    const values: string[] = Object.values(params)

    const indices = Object.keys(params).map((obj, i) => {
      return "$" + (i + 1)
    })
    try {
      const conn = await Client.connect()
      const sql = `SELECT * FROM products WHERE ${keys}=${indices}`
      console.log(sql)
      const result: QueryResult<Product> = await conn.query(sql, [values])
      conn.release()

      const obj: DataObject = {
        status: result.rows.length > 0 ? OK : NO_CONTENT,
        data:
          result.rows.length > 0
            ? result.rows[0]
            : { error: "No Records found" },
      }
      return obj
    } catch (error) {
      throw new Error(`Cannot get product ${error}`)
    }
  }

  async delete(id: number): Promise<DataObject> {
    try {
      const sql = "DELETE FROM products WHERE id=$1 RETURNING *"
      const conn: PoolClient = await Client.connect()
      const result: QueryResult<Product> = await conn.query(sql, [id])

      conn.release()

      const data: DataObject = {
        status: result.rows.length > 0 ? OK : NO_CONTENT,
        data:
          result.rows.length > 0
            ? result.rows[0]
            : { error: "No Records found" },
      }
      return data
    } catch (error) {
      throw new Error(`Unable to Delete: ${error}`)
    }
  }

  async update(id: number, product: JSON): Promise<DataObject> {
    console.log(product);
    const keys: string = Object.keys(product).join(",")
    const values: string[] = Object.values(product)

    const indices: string = Object.keys(product)
      .map((obj, index) => {
        return "$" + (index + 1)
      })
      .join(",")

    const sql = `UPDATE products SET (${keys})=(${indices}) WHERE id=${id} RETURNING *`

    try {
      const conn: PoolClient = await Client.connect()
      const result: QueryResult<Product> = await conn.query(sql, values)

      conn.release()
      const obj: DataObject = {
        status: result.rows.length > 0 ? OK : NO_CONTENT,
        data:
          result.rows.length > 0
            ? result.rows[0]
            : { error: "No Records found" },
      }
      return obj
    } catch (error) {
      throw new Error(`Unable to Update: ${error}`)
    }
  }

  async clean(): Promise<boolean> {
    const sql = "TRUNCATE TABLE products RESTART IDENTITY CASCADE"
    try {
      const conn: PoolClient = await Client.connect()
      await conn.query(sql)

      conn.release()

      return true
    } catch (error) {
      throw new Error(`Unable to Update: ${error}`)
    }
  }
}
