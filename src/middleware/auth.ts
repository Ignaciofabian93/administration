import { type Context } from "../types/context";

export const createContext = ({ req }: { req: any }): Context => {
  const authHeader = req.headers.authorization;
  const userId: string | undefined = req.headers["x-user-id"];

  return {
    req,
    res: req.res,
    token: authHeader?.replace("Bearer ", ""),
    userId,
  };
};
