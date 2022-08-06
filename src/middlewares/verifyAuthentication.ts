import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const tokenSecret = process.env.TOKEN_SECRET as Secret;
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];
    await jwt.verify(token, tokenSecret);
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    res.json("Access denied, invalid token");
  }
};
export default verifyAuthentication;
