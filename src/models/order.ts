import client from "../database";
type order = {
  id: number;
  status: boolean;
  user_name: string;
};

class orderStore {
  async index(): Promise<order[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders;`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error("Server issue: order - index()");
    }
  }

  async show(order_id: number): Promise<order | null> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders where id = $1`;
      const result = await conn.query(sql, [order_id]);
      conn.release();
      if (result.rows.length) {
        return result.rows[0];
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new Error(`Server issue: order - show(id)`);
    }
  }

  async create(user_name: string): Promise<order> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO ORDERS (user_name) VALUES ($1) RETURNING *`;
      const result = await conn.query(sql, [user_name]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Server issue: order - create(user_id)`);
    }
  }

  async delete(id: number): Promise<order | null> {
    try {
      const conn = await client.connect();
      const sql = `DELETE FROM orders where id = $1 RETURNING *;`;
      const result = await conn.query(sql, [id]);
      if (result.rows.length) {
        return result.rows[0];
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Server issue: order - delete(id)`);
    }
  }
}
export { order, orderStore };
