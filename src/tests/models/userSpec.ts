import { user, userStore } from "../../models/user";
const sampleStore = new userStore();

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
    const result = await sampleStore.create(
      "Abdel",
      "ayahia1",
      "Abdelmonsef",
      "pass"
    );
    expect(result.last_name).toEqual("Abdelmonsef");
  });

  it(`2 - Checking the create works with a null lastname`, async (): Promise<void> => {
    const result = await sampleStore.create(`Jo`, `Jo1`, null, `password`);
    expect(result.last_name).toBeNull();
  });

  it(`Checking that show returns the correct object when user_name is valid`, async (): Promise<void> => {
    const result = (await sampleStore.show("Jo1")) as user;
    expect(result.user_name).toEqual("Jo1");
  });

  it(`Checking that index works with entries in the table`, async (): Promise<void> => {
    const result = await sampleStore.index();
    expect(result.length).toBe(2);
  });
});
