import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { user } from "../models/user";

const requiresIdentity = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];

    const user_name: string | null = (jwt.decode(token) as jwt.JwtPayload)
      .user_name;
    if (user_name && user_name === req.params.user_name) {
      next();
    } else {
      throw new Error();
    }
  } catch (err) {
    res.status(403);
    res.json("Access forbidden, users can only access their orders");
  }
};
export default requiresIdentity;
