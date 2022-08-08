import index from "../../server";
import supertest from "supertest";
import client from "../../database";
const Request = supertest(index);

let adminToken: string;

describe(`Creating users: `, async () => {
  it(`Creating admin users`, async () => {
    const admin = {
      firstName: "admin",
      user_name: "admin",
      password: "admin",
    };
    const Response = await Request.post("/users/")
      .send(admin)
      .set("Accept", "application/json");

    const conn = await client.connect();
    const sql = `UPDATE users SET role='admin' WHERE user_name='admin'`;
    await conn.query(sql);
    adminToken = Response.text;
    expect(Response.statusCode).toBe(200);
  });
});

export { adminToken };
