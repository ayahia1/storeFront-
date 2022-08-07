import { order, orderStore } from "../../models/order";
import { userStore } from "../../models/user";

const orders = new orderStore();
const users = new userStore();

describe(`Order Model Test`, () => {
  beforeAll(async (): Promise<void> => {
    await users.create("Abdelrahman", "ayahia1", null, "password");
  });

  it(`Check that index works with empty table`, async (): Promise<void> => {
    const result = await orders.index();
    expect(result.length).toBe(0);
  });

  it("Check that the create function works with valid ID", async () => {
    const result = await orders.create("ayahia1");
    expect(result.user_name).toEqual("ayahia1");
    expect(result.status).toEqual(true);
  });

  it("Check that the show function works", async () => {
    const result = (await orders.show(1)) as order;
    expect(result.id).toEqual(1);
  });

  it("Check that create function throws an error with invalid user_id", async () => {
    await expectAsync(orders.create("randomeUser")).toBeRejectedWith(
      new Error("Server issue: order - create(user_id)")
    );
  });

  it(`Checking that index works with entries in the table`, async (): Promise<void> => {
    const result = await orders.index();
    expect(result.length).toBe(1);
  });

  afterAll(async (): Promise<void> => {
    await orders.delete(1);
    await users.delete("ayahia1");
  });
});
