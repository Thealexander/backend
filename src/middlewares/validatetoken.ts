import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IPayload } from "../interfaces";

interface ExtendedRequest extends Request {
  userId?: string;
}
export const tokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('auth-token');

    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. Token not provided." });
    }

    const payload = jwt.verify(token, process.env.RANDOM_KEY || "") as IPayload;
    (req as ExtendedRequest).userId = payload.userId;
    /*
    console.log("Token verification successful:", {
      userId: (req as ExtendedRequest).userId,
    });
    */

    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ error: "Access denied. Invalid token." });
  }
};
