import { Response, Request } from "express";
const validateID = (req_id: string): boolean => {
  const id = parseFloat(req_id);
  if (id == NaN || !Number.isInteger(id) || id <= 0) {
    return false;
  }
  return true;
};

export default validateID;
