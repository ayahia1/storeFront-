import app from "../server";
import supertest from "supertest";
const request = supertest(app);

it(`Checking that the application's root connects`, async (): Promise<void> => {
  const response = await request.get("/");
  expect(response.statusCode).toBe(200);
});
