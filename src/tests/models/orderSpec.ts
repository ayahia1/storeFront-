import { order, orderStore } from "../../models/order";
import { userStore } from "../../models/user";
const store = new orderStore();
const users = new userStore();

describe(`Order Model Test`, () => {
  beforeAll(async (): Promise<void> => {
    await users.create("Abdel", null, "1234");
  });

  it(`Check that index works with empty table`, async (): Promise<void> => {
    const result = await store.index();
    expect(result.length).toBe(0);
  });

  it(`Check that show returns null when id doesn't exist: active`, async (): Promise<void> => {
    const result = await store.show(4, "active");
    expect(result).toBeNull();
  });

  it(`Check that show returns null when id doesn't exist: complete`, async (): Promise<void> => {
    const result = await store.show(4, "complete");
    expect(result).toBeNull();
  });

  it("Check that show throws an error when status is not valid", async () => {
    await expectAsync(store.show(4, "wrongStatus")).toBeRejectedWith(
      new Error("Server issue: order - show(user_id, status)")
    );
  });

  it("Check that the create function works with valid ID", async () => {
    const result = await store.create(1);
    expect(result.user_id).toEqual(1);
    expect(result.status).toEqual("active");
  });

  it("Check that create function throws an error with invalid user_id", async () => {
    await expectAsync(store.create(100)).toBeRejectedWith(
      new Error("Server issue: order - create(user_id)")
    );
  });

  it("Check that show works with valid ID, status: active", async () => {
    const result = (await store.show(1, "active")) as order[];
    // const expected: order = { id: 1, user_id: 1, status: "active" };
    expect(result[0].user_id).toEqual(1);
  });

  it(`Checking that index works with entries in the table`, async (): Promise<void> => {
    const result = await store.index();
    expect(result.length).toBe(1);
  });

  afterAll(async (): Promise<void> => {
    await store.delete(1);
    await users.delete(1);
  });
});
