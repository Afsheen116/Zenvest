import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../module/auth/User";

interface JwtPayload {
  id: string;
}

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    // Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Not authorized. No token provided.",
      });
      return;
    }

    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // Find user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      res.status(401).json({
        success: false,
        message: "User not found.",
      });
      return;
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Not authorized. Invalid token.",
    });
  }
};