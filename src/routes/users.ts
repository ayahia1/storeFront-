import express, { Request, Response, NextFunction } from "express";
import { user, userStore } from "../models/user";
import { order } from "../models/order";
import validate_names_password from "../middlewares/validate_names_password";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import dashboard from "../services/dashboard";
import verifyAuthentication from "../middlewares/verifyAuthentication";
import verifyAdmin from "../middlewares/verifyAdmin";
import verifyIdentity from "../middlewares/verifyIdentity";

dotenv.config();
const { JWT_TOKEN, PEPPER, SALT_ROUNDS } = process.env;

const users = express.Router();
const store = new userStore();
const board = new dashboard();

users.get(
  "/",
  verifyAuthentication,
  verifyAdmin,
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const results = await store.index();
      res.send(results);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server issue - try later");
    }
  }
);

users.get(
  "/:user_name",
  verifyAuthentication,
  verifyAdmin,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const result: user | null = await store.show(req.params.user_name);

      if (result == null) {
        res.status(404).send("user not found");
      } else {
        res.json(result);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Server issue - try later");
    }
  }
);

users.get(
  "/:user_name/orders",
  verifyAuthentication,
  verifyIdentity,
  async (req, res) => {
    try {
      const result: order[] = await board.ordersByuser(
        req.params.user_name,
        true
      );
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server issue - try later");
    }
  }
);

users.get(
  "/:user_name/orders/completed",
  verifyAuthentication,
  verifyIdentity,
  async (req, res) => {
    try {
      const result = await board.ordersByuser(req.params.user_name, false);
      res.jsonp(result);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server issue - try later");
    }
  }
);

users.post(
  "/",
  validate_names_password,
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (await store.show(req.body.user_name)) {
        res.sendStatus(400).send(`Bad request: user_name already exists`);
        return;
      }

      const firstName = req.body.firstName;
      const user_name = req.body.user_name;
      let lastName;
      if (typeof req.body.lastName == "undefined") {
        lastName = null;
      } else {
        lastName = req.body.lastName;
      }
      const password = bcrypt.hashSync(
        req.body.password + PEPPER,
        parseInt(SALT_ROUNDS as string) as number
      );
      const user = await store.create(firstName, user_name, lastName, password);
      const token = await jwt.sign(
        { user_name: user.user_name },
        JWT_TOKEN as string
      );
      res.send(token);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server issue - try later");
    }
  }
);

users.post(
  "/authenticate",
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (
        typeof req.body.user_name == "undefined" ||
        typeof req.body.password == "undefined"
      ) {
        res
          .status(400)
          .send("Bad Request: You need to provide a user_name and password");
        return;
      }

      const user_name = req.body.user_name;
      const password = req.body.password;
      const user: user | null = await store.show(user_name);
      if (user == null) {
        res.status(400).send("Bad Request: Invalid user_name");
      } else {
        if (await bcrypt.compare(password + PEPPER, user.password)) {
          const token = await jwt.sign(
            { user_name: user.user_name },
            JWT_TOKEN as string
          );
          res.send(token);
        } else {
          res.status(401).send("Unauthorized: Passwords don't match");
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Server issue - try later");
    }
  }
);

export default users;
