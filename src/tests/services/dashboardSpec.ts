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

  it(`Check that show returns null when id doesn't exist: active`, async (): Promise<void> => {
    const result = await board.ordersByuser(4, "active");
    expect(result).toBeNull();
  });

  it(`Check that show returns null when id doesn't exist: complete`, async (): Promise<void> => {
    const result = await board.ordersByuser(4, "complete");
    expect(result).toBeNull();
  });

  it("Check that show throws an error when status is not valid", async () => {
    await expectAsync(board.ordersByuser(4, "wrongStatus")).toBeRejectedWith(
      new Error("Server issue: dashboard - ordersByuser(user_id, status)")
    );
  });
});
