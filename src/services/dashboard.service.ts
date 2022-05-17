import Client from "../database/database"

export class Dashboard {
  async orderItems(orderID : number): Promise<
    { name: string; price: number; order_id: string }[]
  > {
    try {
      const conn = await Client.connect()
      const sql =
        `SELECT name, price, order_id, order_items.quantity FROM products INNER JOIN order_items ON products.id = order_items.product_id WHERE order_id=${orderID}`

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
      //const sql = `SELECT username, orders.id, status FROM users INNER JOIN orders ON users.id = orders.user_id AND users.id=${id}`
      const sql =
        `SELECT name, price, avatar, order_id, order_items.quantity, orders.status FROM products INNER JOIN order_items ON products.id = order_items.product_id INNER JOIN orders ON orders.id = order_items.order_id WHERE orders.user_id=${id}`

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get users orders: ${err}`)
    }
  }
}
