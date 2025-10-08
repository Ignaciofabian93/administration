import { type Context } from "../types/context";

export const createContext = ({ req }: { req: any }): Context => {
  console.log("Headers:", req.headers);

  const authHeader = req.headers.authorization;
  const userId: string | undefined = req.headers["x-user-id"];
  const adminId: string | undefined = req.headers["x-admin-id"];

  return {
    req,
    res: req.res,
    token: authHeader?.replace("Bearer ", ""),
    userId,
    adminId,
  };
};
