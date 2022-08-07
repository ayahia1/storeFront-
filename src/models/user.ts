import client from "../database";

type user = {
  id: number;
  first_name: string;
  user_name: string;
  last_name: string | null;
  password: string;
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

  async show(user_name: string): Promise<user | null> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM users where user_name = $1;`;
      const result = await conn.query(sql, [user_name]);
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
    user_name: string,
    lastName: string | null,
    password: string
  ): Promise<user> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO USERS (user_name, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING *;`;
      const result = await conn.query(sql, [
        user_name,
        firsName,
        lastName,
        password,
      ]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Server issue: user - create(firstName, user_name, lastName, password)`
      );
    }
  }

  async delete(user_name: string): Promise<user | null> {
    try {
      const conn = await client.connect();
      const sql = `DELETE FROM users where user_name = $1 RETURNING *;`;
      const result = await conn.query(sql, [user_name]);
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
