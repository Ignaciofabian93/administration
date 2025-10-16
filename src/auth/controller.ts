import { Request, Response } from "express";
import { compare } from "bcrypt";
import jwt, { type JwtPayload } from "jsonwebtoken";
import prisma from "../client/prisma";
import { environment } from "../config/configs";

// Cookie names for admin authentication
const ADMIN_COOKIE_NAMES = {
  token: "x-o-token",
  refreshToken: "x-o-refresh-token",
} as const;

// Helper function to generate tokens
const generateTokens = (userId: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET is not defined in environment variables");
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15min" });
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
  return { token, refreshToken };
};

// Helper function to get cookie options
const getCookieOptions = (maxAge: number) => ({
  httpOnly: true,
  secure: environment === "production" || environment === "qa",
  sameSite: "lax" as const,
  maxAge,
  domain: environment === "production" || environment === "qa" ? ".ekoru.cl" : undefined,
  path: "/",
});

// Helper function to set authentication cookies
const setAuthCookies = (res: Response, token: string, refreshToken: string) => {
  res.cookie(ADMIN_COOKIE_NAMES.token, token, getCookieOptions(15 * 60 * 1000)); // 15 minutes
  res.cookie(ADMIN_COOKIE_NAMES.refreshToken, refreshToken, getCookieOptions(7 * 24 * 60 * 60 * 1000)); // 7 days
};

// Admin login
export const LoginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400).json({ error: "Email y contraseña son requeridos" });
      return;
    }

    console.log("Login attempt for admin:", email);

    const formattedEmail = email.toLowerCase();

    const admin = await prisma.admin.findUnique({ where: { email: formattedEmail } });
    if (!admin) {
      console.log("Admin not found:", formattedEmail);
      res.status(400).json({ error: "No se encontró al usuario" });
      return;
    }

    const valid = await compare(password, admin.password);
    if (!valid) {
      console.log("Invalid password for:", formattedEmail);
      res.status(400).json({ message: "Credenciales inválidas" });
      return;
    }

    const { token, refreshToken } = generateTokens(admin.id);
    setAuthCookies(res, token, refreshToken);

    console.log("Login successful for admin:", formattedEmail);
    res.json({ token, message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error("Login error for admin:", error);
    res.status(500).json({ error: "Error al procesar el inicio de sesión" });
  }
};

// Refresh token for admins
export const RefreshTokenAdmin = (req: Request, res: Response) => {
  const refreshToken = req.cookies[ADMIN_COOKIE_NAMES.refreshToken];

  if (!refreshToken) {
    return res.status(401).json({ message: "No se pudo generar un nuevo token de acceso" });
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as JwtPayload;
    const newToken = jwt.sign({ userId: payload.userId }, process.env.JWT_SECRET as string, { expiresIn: "15m" });

    res.cookie(ADMIN_COOKIE_NAMES.token, newToken, getCookieOptions(15 * 60 * 1000));
    res.json({ token: newToken, success: true });
  } catch {
    res.status(401).json({ message: "Token de acceso inválido" });
  }
};
