import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { user } from "../models/user";

const requiresAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];

    const User: user | null = (jwt.decode(token) as jwt.JwtPayload)
      .user as user;
    if (!User || User.role !== "admin") {
      throw new Error();
    }
    return next();
  } catch (err) {
    res.status(403);
    res.json("Access forbidden, user must be an admin");
  }
};
export default requiresAdmin;
