// @ts-ignore
import client from '../database';
import bcrypt from 'bcrypt';

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
};

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUND || '10';

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (firstName, lastName, userName, password) VALUES ($1, $2, $3, $4) RETURNING *';

      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));

      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        u.username,
        hash
      ]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not add new user. Error: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE id=$1';
      const result = await conn.query(sql, [id]);
      conn.release();
      if (result.rows.length === 0) {
        throw new Error(`User with id ${id} not found.`);
      }
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user with ID ${id}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = 'DELETE FROM users WHERE id=($1)';
      await conn.query(sql, [id]);

      const sql2 = 'SELECT * FROM users';
      const result = await conn.query(sql2);

      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not delete user with id: ${id}. Error: ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT password FROM users WHERE userName=$1';
      const result = await conn.query(sql, [username]);

      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password + pepper, user.password)) {
          return user;
        }
      }
      conn.release();
      return null;
    } catch (err) {
      throw new Error(`Authentication Failed. Error: ${err}`);
    }
  }
}
