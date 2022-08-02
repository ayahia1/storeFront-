import client from "../database";
type product = {
  id: number;
  name: string;
  price: number;
  category: string | null;
};

class productStore {
  async index(): Promise<product[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products;`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Server issue: product - index()`);
    }
  }

  async show(id: number): Promise<product | null> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products WHERE id = $1;`;
      const result = await conn.query(sql, [id]);
      conn.release();
      if (result.rows.length) {
        return result.rows[0];
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Server issue: product - show(id)`);
    }
  }

  async create(
    name: string,
    price: number,
    category: string | null
  ): Promise<product> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO PRODUCTS (name, price, category) VALUES ($1, $2, $3)  RETURNING *;`;
      const result = await conn.query(sql, [name, price, category]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Server issue: product - create(name, price)`);
    }
  }
}

export { product, productStore };
