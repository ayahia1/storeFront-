import { user, userStore } from "../../models/user";
const sampleStore = new userStore();
let adminToken;
let clientToken;

describe(`User Model Test`, () => {
  it(`Checking that index works with empty table`, async (): Promise<void> => {
    const result = await sampleStore.index();
    expect(result.length).toBe(0);
  });

  it(`Checking that show returns null when id is doesn't exist`, async (): Promise<void> => {
    const result = await sampleStore.show("ihassou1");
    expect(result).toBeNull();
  });

  it(`Checking the create works with a lastname`, async (): Promise<void> => {
    const result = await sampleStore.create("admin", "admin", "admin", "admin");
    expect(result.last_name).toEqual("admin");
  });

  it(`2 - Checking the create works with a null lastname`, async (): Promise<void> => {
    const result = await sampleStore.create("client", "client", null, "client");
    expect(result.last_name).toBeNull();
  });

  it(`Checking that show returns the correct object when user_name is valid`, async (): Promise<void> => {
    const result = (await sampleStore.show("admin")) as user;
    expect(result.user_name).toEqual("admin");
  });

  it(`Checking that index works with entries in the table`, async (): Promise<void> => {
    const result = await sampleStore.index();
    expect(result.length).toBe(2);
  });

  it(`Checking that the delete works with no errors`, async (): Promise<void> => {
    expect(await sampleStore.delete("admin")).not.toBeNull();
    expect(await sampleStore.delete("client")).not.toBeNull();
  });
});
