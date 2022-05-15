import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";

interface IErr {
  statusCode: StatusCodes;
  message: string;
}
const errorHandlerMiddleware = (
  err: IErr,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong try again later",
  };

  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
};

export default errorHandlerMiddleware;
