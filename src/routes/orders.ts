import express from "express";
import validateID from "../utilities/validateID";
import { orderStore, order } from "../models/order";
import { userStore } from "../models/user";
import verifyAuthentication from "../middlewares/verifyAuthentication";
import verifyAdmin from "../middlewares/verifyAdmin";

const store = new orderStore();
const users = new userStore();
const orders = express.Router();

orders.get(
  "/",
  verifyAuthentication,
  verifyAdmin,
  async (_req, res): Promise<void> => {
    try {
      const results = await store.index();
      res.json(results);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server issue - try later");
    }
  }
);

orders.get(
  "/:id",
  verifyAuthentication,
  verifyAdmin,
  async (req, res): Promise<void> => {
    try {
      if (validateID(req.params.id) == false) {
        res
          .status(400)
          .send(`Bad Request: ids should be positive numeric numbers`);
        return;
      }
      const id = req.params.id;
      const result: order | null = await store.show(parseInt(id));

      if (result == null) {
        res.status(404).send("id not found");
      } else {
        res.json(result);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Server issue - try later");
    }
  }
);

orders.post("/", verifyAuthentication, async (req, res) => {
  try {
    if (typeof req.body.user_name != "string" || !req.body.user_name.length) {
      res.status(400).send(`Bad Request: You need to provide a user_name`);
    } else if ((await users.show(req.body.user_name)) == null) {
      res.status(400).send(`Bad Request: user doesn't exist`);
    } else {
      const order = await store.create(req.body.user_name);
      res.json(order);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server issue - try later");
  }
});

export default orders;
