import jwt from "jsonwebtoken";

export const decodedToken = (token: string): { id: string } | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decoded === "object" && "userId" in decoded) {
      return { id: decoded.userId as string };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
