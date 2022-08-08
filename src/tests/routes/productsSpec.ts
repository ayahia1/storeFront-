import supertest from "supertest";
import app from "../../server";
import { adminToken } from "./adminCreateSpec";
const Request = supertest(app);

describe(`Products Route Tests`, () => {
  it(`Checking that the index route work`, async () => {
    const Response = await Request.get("/products/");
    expect(Response.statusCode).toBe(200);
  });

  it(`Checking that the show route throws a 404 Error for invalid ID`, async () => {
    const Response = await Request.get("/products/300");
    expect(Response.statusCode).toBe(404);
  });

  it(`Checking that the create rout works`, async () => {
    const body = {
      name: "Coffee",
      price: 3,
    };
    const Response = await Request.post("/products/")
      .send(body)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(Response.body.price).toBe(3);
  });

  it(`Checking that the show function works`, async () => {
    const Response = await Request.get("/products/1").set(
      "Accept",
      "application/json"
    );
    expect(Response.status).toEqual(200);
    expect(Response.body.id).toEqual(1);
  });
});
