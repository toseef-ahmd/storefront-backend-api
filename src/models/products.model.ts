import { NOT_FOUND, NO_CONTENT, OK } from "http-status-codes"
import { PoolClient, QueryResult } from "pg"
import Client from "../database/database"
import { DataObject } from "../interfaces/common.interface"
import { Product } from "../interfaces/products.interface"

export class ProductModel {
  async index(): Promise<DataObject> {
    console.log("products model")
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
      console.log(error)
      throw new Error(`Cannot get products ${error}`)
    }
  }

  async create(prod: Product): Promise<DataObject> {
    try {
      console.log("prod model create")
      console.log(prod);
      const conn = await Client.connect()
      
      const sql =
        "INSERT INTO products (product, price, quantity, details, rating, avatar) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *"
      const result = await conn.query(sql, [
        prod.name,
        prod.price,
        prod.quantity,
        prod.details,
        prod.rating,
        prod.avatar
      ])

      conn.release()
      
      const obj: DataObject = {
        status: result.rows.length > 0 ? OK : NOT_FOUND,
        data:
          result.rows.length > 0
            ? result.rows[0]
            : { error: "No Records found" },
      }
      return obj
    } catch (error) {
      console.log("model error")
      console.log(error)
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
        status: result.rows.length > 0 ? OK : NOT_FOUND,
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
        status: result.rows.length > 0 ? OK : NOT_FOUND,
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
        status: result.rows.length > 0 ? OK : NOT_FOUND,
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
        status: result.rows.length > 0 ? OK : NOT_FOUND,
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

 async dump(products : Product[]) : Promise<boolean> {
  const conn: PoolClient = await Client.connect()
  let success : boolean = true;
  try {
    "INSERT INTO products (name, price, quantity, details, rating, avatar) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *"
     
    const sql = "INSERT INTO products (name, price, quantity, details, rating, avatar) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *"
    let $items : Product[];

    products.map(async (prod) => {
      const result: QueryResult<Product> = await conn.query(sql, [
        prod.name,
        prod.price,
        prod.quantity,
        prod.details,
        5,
        prod.avatar
      ])

      if(result) {
        console.log(result)
        success = true;
      }
      else {
        success = false;
      }
    })

    return success;
  } catch (error) {
    console.log("error")
    console.log(error)
    return false
  }
 }
}
