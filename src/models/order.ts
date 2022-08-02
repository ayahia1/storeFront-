import client from "../database";
type order = {
  id: number;
  status: string;
  user_id: number;
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

  async show(user_id: number, status: string): Promise<order[] | null> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE user_id = $1 AND status = $2;`;
      const result = await conn.query(sql, [user_id, status]);
      conn.release();
      if (result.rows) {
        return result.rows;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Server issue: order - show(user_id, status)");
    }
  }

  async create(user_id: number): Promise<order> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO ORDERS (user_id, status) VALUES ($1, 'active') RETURNING *`;
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Server issue: order - create(user_id)`);
    }
  }
}

export { order, orderStore };
