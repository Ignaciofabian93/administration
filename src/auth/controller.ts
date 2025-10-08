import { Request, Response } from "express";
import { compare } from "bcrypt";
import jwt, { type JwtPayload } from "jsonwebtoken";
import prisma from "../client/prisma";
import { environment } from "../config/configs";

// Types for cookie configuration
type UserType = "admin" | "seller";

interface CookieNames {
  token: string;
  refreshToken: string;
}

// Helper function to get cookie names based on user type
const getCookieNames = (userType: UserType): CookieNames => {
  if (userType === "admin") {
    return {
      token: "x-o-token",
      refreshToken: "x-o-refresh-token",
    };
  }
  return {
    token: "token",
    refreshToken: "refreshToken",
  };
};

// Helper function to generate tokens
const generateTokens = (userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: "15min" });
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: "7d" });
  return { token, refreshToken };
};

// Helper function to get cookie options
const getCookieOptions = (maxAge: number) => ({
  httpOnly: environment === "production" || environment === "qa",
  secure: environment === "production" || environment === "qa",
  sameSite: "lax" as const,
  maxAge,
  domain: environment === "production" || environment === "qa" ? ".ekoru.cl" : undefined,
});

// Helper function to set authentication cookies
const setAuthCookies = (res: Response, token: string, refreshToken: string, userType: UserType) => {
  const cookieNames = getCookieNames(userType);

  res.cookie(cookieNames.token, token, getCookieOptions(15 * 60 * 1000)); // 15 minutes
  res.cookie(cookieNames.refreshToken, refreshToken, getCookieOptions(7 * 24 * 60 * 60 * 1000)); // 7 days
};

// Generic login handler
const handleLogin = async (
  req: Request,
  res: Response,
  userType: UserType,
  findUser: (email: string) => Promise<{ id: string; password: string } | null>,
) => {
  const { email, password } = req.body;
  const formattedEmail = email.toLowerCase();

  const user = await findUser(formattedEmail);
  if (!user) {
    res.status(400).json({ error: "No se encontró al usuario" });
    return;
  }

  const valid = await compare(password, user.password);
  if (!valid) {
    res.status(400).json({ message: "Credenciales inválidas" });
    return;
  }

  const { token, refreshToken } = generateTokens(user.id);
  setAuthCookies(res, token, refreshToken, userType);

  res.json({ token, message: "Inicio de sesión exitoso" });
};

// Admin login
export const LoginAdmin = async (req: Request, res: Response) => {
  await handleLogin(req, res, "admin", (email) => prisma.admin.findUnique({ where: { email } }));
};

// Seller login
export const Login = async (req: Request, res: Response) => {
  await handleLogin(req, res, "seller", (email) => prisma.seller.findUnique({ where: { email } }));
};

// Generic refresh token handler
const handleRefreshToken = (req: Request, res: Response, userType: UserType) => {
  const cookieNames = getCookieNames(userType);
  const refreshToken = req.cookies[cookieNames.refreshToken];

  if (!refreshToken) {
    return res.status(401).json({ message: "No se pudo generar un nuevo token de acceso" });
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as JwtPayload;
    const newToken = jwt.sign({ userId: payload.userId }, process.env.JWT_SECRET as string, { expiresIn: "15m" });

    res.cookie(cookieNames.token, newToken, getCookieOptions(15 * 60 * 1000));
    res.json({ token: newToken, success: true });
  } catch {
    res.status(401).json({ message: "Token de acceso inválido" });
  }
};

// Refresh token for sellers
export const RefreshToken = (req: Request, res: Response) => {
  handleRefreshToken(req, res, "seller");
};

// Refresh token for admins
export const RefreshTokenAdmin = (req: Request, res: Response) => {
  handleRefreshToken(req, res, "admin");
};
