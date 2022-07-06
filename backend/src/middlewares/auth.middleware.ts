import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import config from "../config";
import { User } from "../models";
import { HttpException } from "../exceptions";
import { DataStoredInToken } from "../interfaces/auth.interface";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    !(
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
  )
    throw new HttpException(404, "Authorization token missing");

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = (await jwt.verify(
      token,
      config.JWT_SECRET
    )) as DataStoredInToken;

    if (!decodedToken.isAdmin)
      return next(new HttpException(401, "You are not an admin"));

    const user = await User.findById(decodedToken._id).select("-password");
    if (!user) {
      return next(new HttpException(401, "Wrong authorization token"));
    }

    req.user = user;
    next();
  } catch (error) {
    throw new HttpException(401, "Wrong authentication token");
  }
};

export default authMiddleware;
