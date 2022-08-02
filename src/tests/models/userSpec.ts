import { user, userStore } from "../../models/user";
const sampleStore = new userStore();

describe(`User Model Test`, () => {
  it(`Checking that index works with empty table`, async (): Promise<void> => {
    const result = await sampleStore.index();
    expect(result.length).toBe(0);
  });

  it(`Checking that show returns null when id is doesn't exist`, async (): Promise<void> => {
    const result = await sampleStore.show(4);
    expect(result).toBeNull();
  });

  it(`Checking the create works with a lastname`, async (): Promise<void> => {
    const result = await sampleStore.create(`Jo`, `Alex`, `1234`);
    // const expectd: user = {
    //   id: 1,
    //   first_name: "Jo",
    //   last_name: "Alex",
    //   password_digest: "1234",
    // };
    expect(result.last_name).toEqual("Alex");
  });

  it(`2 - Checking the create works with a null lastname`, async (): Promise<void> => {
    const result = await sampleStore.create(`Abdel`, null, `password`);
    expect(result.last_name).toBeNull();
  });

  it(`Checking that show returns the correct object when id is valid`, async (): Promise<void> => {
    const result = (await sampleStore.show(2)) as user;
    expect(result.id).toEqual(2);
  });

  it(`Checking that index works with entries in the table`, async (): Promise<void> => {
    const result = await sampleStore.index();
    expect(result.length).toBe(2);
  });
});
