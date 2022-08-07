import { Request, Response, NextFunction } from "express";
const validate_names_password = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (
    typeof req.body.firstName != "string" ||
    typeof req.body.password != "string" ||
    typeof req.body.user_name != "string" ||
    (typeof req.body.lastName != "string" &&
      typeof req.body.lastName != "undefined") ||
    !req.body.firstName.length ||
    !req.body.password.length ||
    !req.body.user_name
  ) {
    res.status(400).send(`Bad request: You should provide the following
                          firstName: a string with positive length
                          userName: a string with positive length
                          lastName: a string with positive length or undefined
                          password: a string with positive length`);
  } else {
    next();
  }
};

export default validate_names_password;
