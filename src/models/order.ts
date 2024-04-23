// @ts-expect-error: Importing client for database connection
import client from '../database';

export type Order = {
  id?: number;
  status: string;
  user_id: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-expect-error: Establishing connection to the database
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders ORDER BY id';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      // @ts-expect-error: Establishing connection to the database
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *';

      const result = await conn.query(sql, [o.status, o.user_id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=$1';
      // @ts-expect-error: Establishing connection to the database
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);
      conn.release();

      if (result.rows.length === 0) {
        throw new Error(`Order with id ${id} not found.`);
      }

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order with id:  ${id}. Error: ${err}`);
    }
  }

  async update(o: Order): Promise<Order> {
    try {
      // @ts-expect-error: Establishing connection to the database
      const conn = await client.connect();
      const sql = 'UPDATE orders SET status = $2, user_id = $3 WHERE id = $1';

      await conn.query(sql, [o.id, o.status, o.user_id]);
      const sql2 = 'SELECT * FROM orders WHERE id = $1';
      const result = await conn.query(sql2, [o.id]);

      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update order with id:  ${o.id}. Error: ${err}`
      );
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)';
      // @ts-expect-error: Establishing connection to the database
      const conn = await client.connect();

      await conn.query(sql, [id]);

      const sql2 = 'SELECT * FROM orders ORDER BY id';
      const result = await conn.query(sql2);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }

  async deleteAddProduct(id: string): Promise<Order[]> {
    try {
      const sql = 'DELETE FROM order_products WHERE id=($1)';
      // @ts-expect-error: Establishing connection to the database
      const conn = await client.connect();

      await conn.query(sql, [id]);

      const sql2 = 'SELECT * FROM order_products ORDER BY id';
      const result = await conn.query(sql2);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not delete added product ${id}. Error: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    productId: string,
    orderId: string
  ): Promise<Order> {
    // get order to see if it is active
    try {
      const ordersql = 'SELECT * FROM orders WHERE id=$1';
      // @ts-expect-error: Establishing connection to the database
      const conn = await client.connect();

      const result = await conn.query(ordersql, [orderId]);

      const order = result.rows[0];

      if (order.status == 'complete') {
        throw new Error(
          `Could not add product ${productId} to order ${orderId} because order status is ${order.status}`
        );
      }

      const sql =
        'INSERT INTO order_products (quantity, order_Id, product_Id) VALUES ($1, $2, $3) RETURNING *';

      const result2 = await conn.query(sql, [quantity, orderId, productId]);

      const order2 = result2.rows[0];

      conn.release();
      return order2;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}
