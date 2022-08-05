import supertest from "supertest";
import app from "../../server";
const Request = supertest(app);

// describe(`Checking that the users route works`, () => {
//   it(`Users root route return an empty list`, async () => {
//     const Response = await Request.get("/users");
//     expect(Request.status)
//   });
// });
