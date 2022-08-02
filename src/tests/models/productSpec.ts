import { product, productStore } from "../../models/product";
const store = new productStore();
describe(`Product Model Test`, () => {
  it(`Checking that index works with empty table`, async (): Promise<void> => {
    const result = await store.index();
    expect(result.length).toBe(0);
  });

  it(`Checking that show returns null when id is doesn't exist`, async (): Promise<void> => {
    const result = await store.show(4);
    expect(result).toBeNull();
  });

  it(`Checking the create works with a defined category`, async (): Promise<void> => {
    const result = await store.create(`TV`, 4, `electrical`);
    const expectd: product = {
      id: 1,
      name: "TV",
      price: 4,
      category: "electrical",
    };
    expect(result).toEqual(expectd);
  });

  it(`Checking the create works with a null category`, async (): Promise<void> => {
    const result = await store.create(`Pants`, 2, null);
    const expectd: product = {
      id: 2,
      name: "Pants",
      price: 2,
      category: null,
    };
    expect(result).toEqual(expectd);
  });

  it(`Checking that show returns the correct object`, async (): Promise<void> => {
    const result = await store.show(2);
    const expectd: product = {
      id: 2,
      name: "Pants",
      price: 2,
      category: null,
    };
    expect(result).toEqual(expectd);
  });

  it(`Checking that index works with entries in the table`, async (): Promise<void> => {
    const result = await store.index();
    expect(result.length).toBe(2);
  });
});
