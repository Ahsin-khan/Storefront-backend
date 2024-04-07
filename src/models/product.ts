// @ts-ignore
import client from "../database";

export type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
}

export class ProductStore {

    async index(): Promise<Product[]> {
        try {
          // @ts-ignore
          const conn = await client.connect()
          const sql = 'SELECT * FROM products'
    
          const result = await conn.query(sql)
    
          conn.release()
    
          return result.rows 
        } catch (err) {
          throw new Error(`Could not get products. Error: ${err}`)
        }
    }

async create(p: Product): Promise<Product> {
    try {
              // @ts-ignore
  const conn = await client.connect()
  const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *'

  const result = await conn
      .query(sql, [p.name, p.price, p.category])

  const product = result.rows[0]

  conn.release()

  return product
    } catch (err) {
        throw new Error(`Could not add new product. Error: ${err}`)
    }
}

async show(id: number): Promise<Product> {
    try {
        const sql = 'SELECT * FROM products WHERE id=$1';
        // @ts-ignore
        const conn = await client.connect();

        const result = await conn.query(sql, [id]);

        conn.release();

        if (result.rows.length === 0) {
            throw new Error(`Product with id ${id} not found.`);
        }

        return result.rows[0];
    } catch (err) {
        throw new Error(`Could not find product with id:  ${id}. Error: ${err}`);
    }
}


async update(p: Product): Promise<Product> {
    try {
        // @ts-ignore
        const conn = await client.connect();
        const sql = 'UPDATE products SET name = $2, price = $3, category = $4 WHERE id = $1';

        await conn.query(sql, [p.id, p.name, p.price, p.category]);
        const sql2 = 'SELECT * FROM products ORDER BY id'
        const result = await conn.query(sql2)

        conn.release();
        return result.rows 
    } catch (err) {
        throw new Error(`Could not update product with id:  ${p.id}. Error: ${err}`);
    }
}


async delete(id: string): Promise<Product> {
    try {
  const sql = 'DELETE FROM products WHERE id=($1)'
  // @ts-ignore
  const conn = await client.connect()

  await conn.query(sql, [id]);

  const sql2 = 'SELECT * FROM products';
  const result = await conn.query(sql2);

  conn.release()

  return result.rows;
} catch (err) {
        throw new Error(`Could not delete book ${id}. Error: ${err}`)
    }
}

async productCategory(cat: string): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT * FROM products WHERE category=($1)'

      const result = await conn.query(sql, [cat])

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get products of specified category. Error: ${err}`)
    }
}




}