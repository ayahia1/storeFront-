import supertest from "supertest";
import app from "../../server";
import { adminToken } from "./adminCreateSpec";
const Request = supertest(app);

describe("Users Route Tests", () => {
  it("Checking the index route", async () => {
    const Response = await Request.get("/users/").set(
      "Authorization",
      `Bearer ${adminToken}`
    );
    expect(Response.statusCode).toBe(200);
  });

  it(`Checking that the show route throws a 404 Error for invalid ID`, async () => {
    const Response = await Request.get("/users/300").set(
      "Authorization",
      `Bearer ${adminToken}`
    );
    expect(Response.statusCode).toBe(404);
  });

  it(`Checking that the create rout works`, async () => {
    const body = {
      firstName: "Ibrahem",
      user_name: "ihassou1",
      password: "pass",
    };
    const Response = await Request.post("/users/")
      .send(body)
      .set("Accept", "application/json");
    expect(Response.statusCode).toBe(200);
  });

  it(`Checking that the show route works`, async () => {
    const Response = await Request.get("/users/ihassou1").set(
      "Authorization",
      `Bearer ${adminToken}`
    );
    expect(Response.statusCode).toEqual(200);
    expect(Response.body.first_name).toEqual("Ibrahem");
  });

  it(`Checking that the authenticate route works`, async () => {
    const body = {
      user_name: "ihassou1",
      password: "pass",
    };
    const Response = await Request.post("/users/authenticate")
      .send(body)
      .set("Accept", "application/json");
    expect(Response.statusCode).toBe(200);
  });

  it(`Checking that the show by user_name route works`, async () => {
    const Response = await Request.get("/users/admin/orders").set(
      "Authorization",
      `Bearer ${adminToken}`
    );
    expect(Response.statusCode).toEqual(200);
    expect(Response.body[0].user_name).toBe("admin");
  });

  it(`Checking that show completed by user_name route works`, async () => {
    const Response = await Request.get("/users/admin/orders/completed").set(
      "Authorization",
      `Bearer ${adminToken}`
    );
    expect(Response.statusCode).toEqual(200);
    expect(Response.body.length).toBe(0);
  });
});
