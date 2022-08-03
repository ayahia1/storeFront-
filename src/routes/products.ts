import express from "express";
import { productStore, product } from "../models/product";
import validateID from "../utilities/validateID";

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

products.post("/", async (req, res): Promise<void> => {
  try {
    if (
      typeof req.body.name == "undefined" ||
      typeof req.body.price == "undefined" ||
      req.body.price == "" ||
      parseFloat(req.body.price) == NaN
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
});
export default products;
