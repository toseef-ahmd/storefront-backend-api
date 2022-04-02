import Client from "../database/database"

export class Dashboard {
  async orderItems(): Promise<
    { name: string; price: number; order_id: string }[]
  > {
    try {
      const conn = await Client.connect()
      const sql =
        "SELECT name, price, order_id FROM products INNER JOIN order_items ON products.id = order_items.product_id"

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`)
    }
  }

  async userOrders(
    id: number
  ): Promise<{ username: string; order_id: number }[]> {
    try {
      const conn = await Client.connect()
      const sql = `SELECT username, orders.id, status FROM users INNER JOIN orders ON users.id = orders.user_id AND users.id=${id}`

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get users orders: ${err}`)
    }
  }
}
