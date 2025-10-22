import jwt, { type JwtPayload } from "jsonwebtoken";
import { type Context } from "../types/context";

export const createContext = ({ req }: { req: any }): Context => {
  console.log("\n🔐 Creating GraphQL Context");
  console.log("Headers:", req.headers);
  console.log("Cookies:", req.cookies);

  const authHeader = req.headers.authorization;
  let adminId: string | undefined = req.headers["x-admin-id"];

  // Try to extract adminId from x-o-token cookie
  if (!adminId && req.cookies && req.cookies["x-o-token"]) {
    try {
      const decoded = jwt.verify(req.cookies["x-o-token"], process.env.JWT_SECRET as string) as JwtPayload;
      console.log("📦 Decoded x-o-token:", decoded);

      // Extract adminId from token (your controller.ts signs with 'adminId')
      adminId = decoded.adminId;
      console.log("✅ Admin ID extracted from x-o-token cookie:", adminId);
    } catch (error) {
      console.warn("❌ Failed to decode admin token from x-o-token cookie:", error);
    }
  }

  // Try to extract adminId from x-o-refresh-token if not found
  if (!adminId && req.cookies && req.cookies["x-o-refresh-token"]) {
    try {
      const decoded = jwt.verify(req.cookies["x-o-refresh-token"], process.env.JWT_REFRESH_SECRET as string) as JwtPayload;
      console.log("📦 Decoded x-o-refresh-token:", decoded);

      adminId = decoded.adminId;
      console.log("✅ Admin ID extracted from x-o-refresh-token cookie:", adminId);
    } catch (error) {
      console.warn("❌ Failed to decode admin token from x-o-refresh-token cookie:", error);
    }
  }

  // Try to extract from Authorization header if still not found
  if (!adminId && authHeader) {
    try {
      const token = authHeader.replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
      console.log("📦 Decoded Authorization header:", decoded);

      adminId = decoded.adminId;
      console.log("✅ Admin ID extracted from Authorization header");
    } catch (error) {
      console.warn("❌ Failed to decode token from Authorization header:", error);
    }
  }

  console.log("📋 Final Context:", { adminId });

  return {
    req,
    res: req.res,
    token: authHeader?.replace("Bearer ", "") || req.cookies?.["x-o-token"],
    adminId,
  };
};
