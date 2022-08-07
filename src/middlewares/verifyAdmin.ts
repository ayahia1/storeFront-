import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { userStore } from "../models/user";

const users = new userStore();

const requiresAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    // console.log(authorizationHeader);
    const token = authorizationHeader.split(" ")[1];
    const user_name = (jwt.decode(token) as jwt.JwtPayload).user_name;

    if (user_name) {
      const user = await users.show(user_name);
      if (user && user.role == "admin") {
        return next();
      } else {
        throw new Error();
      }
    } else {
      throw new Error();
    }
  } catch (err) {
    res.status(403);
    res.json("Access forbidden, user must be an admin");
  }
};
export default requiresAdmin;
