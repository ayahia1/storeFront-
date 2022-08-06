import supertest from "supertest";
import app from "../../server";
const Request = supertest(app);

describe("Orders Route Tests", () => {
  it("Checking the index route", async () => {
    const Response = await Request.get("/orders/");
    expect(Response.statusCode).toBe(200);
  });

  it(`Checking that the show by id route throws a 404 Error for invalid ID`, async () => {
    const Response = await Request.get("/orders/300");
    expect(Response.statusCode).toBe(404);
  });

  it(`Checking that the create rout works`, async () => {
    const body = {
      user_id: "2",
    };
    const Response = await Request.post("/orders/")
      .send(body)
      .set("Accept", "application/json");
    expect(Response.statusCode).toBe(200);
    expect(Response.body.user_id).toBe(2);
  });

  it(`Checking that the show by user_id route works`, async () => {
    const Response = await Request.get("/orders/user/2/active");
    expect(Response.statusCode).toEqual(200);
    expect(Response.body[0].user_id).toBe(2);
  });

  it(`Checking that the show by id works`, async () => {
    const Response = await Request.get("/users/3");
    expect(Response.body.id).toBe(3);
    expect(Response.statusCode).toEqual(200);
  });
});
