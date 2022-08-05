import { product } from "../models/product";
import { order } from "../models/order";
import client from "../database";

class dashboard {
  async productsByCategory(category: string): Promise<product[] | null> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products WHERE category = $1`;
      const results = await conn.query(sql, [category]);
      conn.release();
      if (results.rows.length) {
        return results.rows;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Server issue: dashboard - productsByCategory(category)`);
    }
  }

  async ordersByuser(user_id: number, status: string): Promise<order[] | null> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE user_id = $1 AND status = $2;`;
      const result = await conn.query(sql, [user_id, status]);
      conn.release();
      if (result.rows.length) {
        return result.rows;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(
        "Server issue: dashboard - ordersByuser(user_id, status)"
      );
    }
  }
}

export default dashboard;
