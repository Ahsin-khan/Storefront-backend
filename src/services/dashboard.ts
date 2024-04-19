// @ts-ignore
import client from '../database';

export type CurrentOrder = {
  id?: number;
  firstName: string;
  lastName: string;
  status: string;
  productName: string;
  price: number;
  quantity: number;
};

export class DashboardQueries {
  // Get all products that have been included in orders

  //Current-Active Order
  async usersCurrnetOrder(id: string): Promise<CurrentOrder[]> {
    try {
      const status: string = 'active';
      //@ts-ignore
      const conn = await client.connect();
      const sql2 =
        'SELECT firstName, lastName, status, orders.id FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.user_id = $1 AND status = $2;';

      const result2 = await conn.query(sql2, [id, status]);
      const orderId = result2.rows[0].id;

      const sql3 =
        'SELECT name, price, quantity FROM products JOIN order_products ON products.id = order_products.product_id WHERE order_products.order_id = $1;';
      const result3 = await conn.query(sql3, [orderId]);

      const mergedResults = [...result2.rows, ...result3.rows];
      conn.release();

      return mergedResults;
    } catch (err) {
      throw new Error(`unable get result: ${err}`);
    }
  }

  // Completed Order
  async usersCompletedOrder(id: string): Promise<CurrentOrder[]> {
    try {
      const status: string = 'complete';
      //@ts-ignore
      const conn = await client.connect();
      const sql2 =
        'SELECT firstName, lastName, status, orders.id FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.user_id = $1 AND status = $2;';

      const result2 = await conn.query(sql2, [id, status]);
      const orderId = result2.rows[0].id;

      const sql3 =
        'SELECT name, price, quantity FROM products JOIN order_products ON products.id = order_products.product_id WHERE order_products.order_id = $1;';
      const result3 = await conn.query(sql3, [orderId]);

      const mergedResults = [...result2.rows, ...result3.rows];
      conn.release();

      return mergedResults;
    } catch (err) {
      throw new Error(`unable get result: ${err}`);
    }
  }
}
