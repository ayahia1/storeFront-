import express from "express";
import { productStore, product } from "../models/product";
import dashboard from "../services/dashboard";
import validateID from "../utilities/validateID";
import verifyAuthentication from "../middlewares/verifyAuthentication";
import verifyAdmin from "../middlewares/verifyAdmin";

const board = new dashboard();
const store = new productStore();
const products = express.Router();

products.get("/", async (_req, res): Promise<void> => {
  try {
    const results = await store.index();
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server issue - try later");
  }
});

products.get("/:id", async (req, res): Promise<void> => {
  try {
    if (validateID(req.params.id) == false) {
      res
        .status(400)
        .send(`Bad Request: ids should be positive numeric numbers`);
      return;
    }
    const id = req.params.id;
    const result: product | null = await store.show(parseInt(id));

    if (result == null) {
      res.status(404).send("id not found");
    } else {
      res.json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server issue - try later");
  }
});

products.get("/category/:category", async (req, res): Promise<void> => {
  try {
    const result = await board.productsByCategory(req.params.category);
    if (result) {
      res.json(result);
    } else {
      res
        .status(404)
        .send(
          `Resource not found: There are no products with the requested category: ${req.params.category}`
        );
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server issue - try later");
  }
});

products.post(
  "/",
  verifyAuthentication,
  verifyAdmin,
  async (req, res): Promise<void> => {
    try {
      if (
        typeof req.body.name == "undefined" ||
        typeof req.body.price == "undefined" ||
        isNaN(parseFloat(req.body.price))
      ) {
        res
          .status(400)
          .send("Bad Request: You must provide a name and numeric price");
        return;
      }
      const name = req.body.name;
      const price = parseFloat(req.body.price);
      let category = null;
      if (typeof req.body.category != "undefined") {
        category = req.body.category;
      }
      const result = await store.create(name, price, category);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server issue - try later");
    }
  }
);

export default products;
