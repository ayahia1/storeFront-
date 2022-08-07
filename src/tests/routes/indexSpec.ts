import index from "../../server";
import supertest from "supertest";
const Request = supertest(index);

describe(`Check that the index routes redirect to each of the three routes`, () => {
  it(`Redirect to the users route`, async () => {
    const response = await Request.get("/users");
    expect(response.statusCode).toEqual(200);
  });

  it(`Redirect to the orders route`, async () => {
    const response = await Request.get("/products");
    expect(response.statusCode).toEqual(200);
  });

  it(`Redirect to the products route`, async () => {
    const response = await Request.get("/orders");
    expect(response.statusCode).toEqual(200);
  });
});
