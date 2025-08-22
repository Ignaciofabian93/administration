import jwt from "jsonwebtoken";
import { type Context } from "../types/context";

export const decodedToken = (token: string): { userId: string } | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");

    if (typeof decoded === "object" && "userId" in decoded) {
      return { userId: decoded.userId as string };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const createContext = ({ req }: { req: any }): Context => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  let userId: string | undefined;

  if (token) {
    const decoded = decodedToken(token);
    if (decoded) {
      userId = decoded.userId;
    }
  }

  return {
    req,
    res: req.res,
    token,
    userId,
  };
};
