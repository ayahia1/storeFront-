import supertest from "supertest";
import app from "../../server";
const Request = supertest(app);

describe("Users Route Tests", () => {
  it("Checking the index route", async () => {
    const Response = await Request.get("/users/");
    expect(Response.statusCode).toBe(200);
  });

  it(`Checking that the show route throws a 404 Error for invalid ID`, async () => {
    const Response = await Request.get("/users/300");
    expect(Response.statusCode).toBe(404);
  });

  it(`Checking that the create rout works`, async () => {
    const body = {
      firstName: "Ibrahem",
      password: "pass",
    };
    const Response = await Request.post("/users/")
      .send(body)
      .set("Accept", "application/json");
    expect(Response.statusCode).toBe(200);
  });

  it(`Checking that the show route works`, async () => {
    const Response = await Request.get("/users/2");
    expect(Response.statusCode).toEqual(200);
    expect(Response.body.first_name).toEqual("Jo");
  });

  it(`Checking that the authenticate route works`, async () => {
    const body = {
      id: "4",
      password: "pass",
    };
    const Response = await Request.post("/users/authenticate")
      .send(body)
      .set("Accept", "application/json");
    expect(Response.statusCode).toBe(200);
  });
});
