import express, { Request, Response, NextFunction } from "express";
import { user, userStore } from "../models/user";
import validate_names_password from "../middlewares/validate_names_password";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import validateID from "../utilities/validateID";

dotenv.config();
const { JWT_TOKEN, PEPPER, SALT_ROUNDS } = process.env;

const users = express.Router();
const store = new userStore();
users.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const results = await store.index();
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server issue - try later");
  }
});

users.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    if (validateID(req.params.id) == false) {
      res
        .status(400)
        .send(`Bad Request: ids should be positive numeric numbers`);
      return;
    }

    const id = req.params.id;
    const result: user | null = await store.show(parseInt(id));

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

users.post(
  "/",
  validate_names_password,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const firstName = req.body.firstName;
      let lastName;
      if (typeof req.body.lastName == "undefined") {
        lastName = null;
      } else {
        lastName = req.body.lastName;
      }
      const password = req.body.password;
      const password_digest = bcrypt.hashSync(
        password + PEPPER,
        parseInt(SALT_ROUNDS as string) as number
      );
      const user = await store.create(firstName, lastName, password_digest);
      const token = await jwt.sign(
        { firstName: firstName, id: user.id },
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
        typeof req.body.id == "undefined" ||
        typeof req.body.password == "undefined"
      ) {
        res
          .status(400)
          .send("Bad Request: You need to provide an id and password");
        return;
      }

      if (validateID(req.body.id) == false) {
        res
          .status(400)
          .send(`Bad Request: ids should be positive numeric numbers`);
        return;
      }
      const id = req.body.id;
      const password = req.body.password;
      const user: user | null = await store.show(parseInt(id));
      if (user == null) {
        res.status(400).send("Bad Request: Invalid user id");
      } else {
        if (await bcrypt.compare(password + PEPPER, user.password_digest)) {
          const token = await jwt.sign(
            { firstName: user.first_name, id: user.id },
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
