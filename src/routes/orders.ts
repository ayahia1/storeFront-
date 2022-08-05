import express from "express";
import validateID from "../utilities/validateID";
import { orderStore, order } from "../models/order";
import { userStore } from "../models/user";
import dashboard from "../services/dashboard";

const store = new orderStore();
const users = new userStore();
const board = new dashboard();
const orders = express.Router();

orders.get("/", async (_req, res): Promise<void> => {
  try {
    const results = await store.index();
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server issue - try later");
  }
});

orders.get("/:id", async (req, res): Promise<void> => {
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
});

orders.get("/user/:id/:status", async (req, res) => {
  try {
    if (validateID(req.params.id) == false) {
      res
        .status(400)
        .send(`Bad Request: ids should be positive numeric numbers`);
    } else if (
      req.params.status != "active" &&
      req.params.status != "complete"
    ) {
      res
        .status(400)
        .send(`Bad Request: Status must be either "complete" or "active"`);
    } else {
      const id = req.params.id;
      const result: order[] | null = await board.ordersByuser(
        parseInt(id) as number,
        req.params.status
      );
      if (result == null) {
        res
          .status(404)
          .send(
            `User id ${req.params.id} has no orders with the status ${req.params.status}`
          );
      } else {
        res.json(result);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server issue - try later");
  }
});

orders.post("/", async (req, res) => {
  try {
    if (typeof req.body.id != "string" || !req.body.id.length) {
      res
        .status(400)
        .send(`Bad Request: You need to provide a key value pair for the id`);
    } else if (validateID(req.body.id) == false) {
      res
        .status(400)
        .send(`Bad Request: ids should be positive numeric numbers`);
    } else if ((await users.show(parseInt(req.body.id))) == null) {
      res.status(400).send(`Bad Request: user doesn't exist`);
    } else {
      const order = await store.create(parseInt(req.body.id));
      res.json(order);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server issue - try later");
  }
});

export default orders;
