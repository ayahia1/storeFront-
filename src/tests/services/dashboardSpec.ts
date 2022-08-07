import dashboard from "../../services/dashboard";
import { product } from "../../models/product";

const board = new dashboard();

describe("Dashboard functions tests", () => {
  it(`Check productsByCategory(category): existing category`, async () => {
    const result = (await board.productsByCategory("electrical")) as product[];
    expect(result.length).toEqual(1);
  });

  it(`Check productsByCategory(category): non-existing category`, async () => {
    const result = await board.productsByCategory("randomCategory");
    expect(result).toBeNull();
  });

  it(`Check that show returns empty array when user_name doesn't exist: active`, async (): Promise<void> => {
    const result = await board.ordersByuser("randome", true);
    expect(result.length).toBe(0);
  });

  it(`Check that show returns empty array when user_name doesn't exist: completed`, async (): Promise<void> => {
    const result = await board.ordersByuser("randome", false);
    expect(result.length).toBe(0);
  });
});
