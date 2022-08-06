import client from "../database";

type user = {
  id: number;
  first_name: string;
  last_name: string | null;
  password_digest: string;
  role: string;
};

class userStore {
  async index(): Promise<user[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM users;`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Server issue: user - index()`);
    }
  }

  async show(id: number): Promise<user | null> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM users where id = $1;`;
      const result = await conn.query(sql, [id]);
      conn.release();
      if (result.rows.length) {
        return result.rows[0];
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Server issue: user - show(id)`);
    }
  }

  async create(
    firsName: string,
    lastName: string | null,
    password: string
  ): Promise<user> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO USERS (first_name, last_name, password_digest) VALUES ($1, $2, $3) RETURNING *;`;
      const result = await conn.query(sql, [firsName, lastName, password]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Server issue: user - create(firstName, lastName, password)`
      );
    }
  }

  async delete(id: number): Promise<user | null> {
    try {
      const conn = await client.connect();
      const sql = `DELETE FROM users where id = $1 RETURNING *;`;
      const result = await conn.query(sql, [id]);
      if (result.rows.length) {
        return result.rows[0];
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Server issue: user - delete(id)`);
    }
  }
}
export { user, userStore };
