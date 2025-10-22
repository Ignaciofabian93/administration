import { Request, Response } from "express";
import { compare } from "bcrypt";
import jwt, { type JwtPayload } from "jsonwebtoken";
import prisma from "../client/prisma";
import { environment } from "../config/configs";

export const LoginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const formattedEmail = email.toLowerCase();
  const admin = await prisma.admin.findUnique({ where: { email: formattedEmail } });
  if (!admin) {
    res.status(400).json({ error: "No se encontró al usuario" });
    return;
  }

  const valid = await compare(password, admin.password);
  if (!valid) {
    res.status(400).json({ message: "Credenciales inválidas" });
    return;
  }
  const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET as string, { expiresIn: "15min" });
  const refreshToken = jwt.sign({ adminId: admin.id }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: "7d",
  });
  res.cookie("x-o-token", token, {
    httpOnly: environment === "production" || environment === "qa",
    secure: environment === "production" || environment === "qa",
    sameSite: "lax",
    maxAge: 15 * 60 * 1000, // 15 minutes
    domain: environment === "production" || environment === "qa" ? ".ekoru.cl" : undefined,
  });
  res.cookie("x-o-refresh-token", refreshToken, {
    httpOnly: environment === "production" || environment === "qa",
    secure: environment === "production" || environment === "qa",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    domain: environment === "production" || environment === "qa" ? ".ekoru.cl" : undefined,
  });
  res.json({ token, message: "Inicio de sesión exitoso" });
};

export const RefreshTokenAdmin = (req: Request, res: Response) => {
  const refreshToken = req.cookies["x-o-refresh-token"];
  if (!refreshToken) {
    return res.status(401).json({ message: "No se pudo generar un nuevo token de acceso" });
  }
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as JwtPayload;
    const newToken = jwt.sign({ adminId: payload.adminId }, process.env.JWT_SECRET as string, { expiresIn: "15m" });
    res.cookie("x-o-token", newToken, {
      httpOnly: environment === "production" || environment === "qa",
      secure: environment === "production" || environment === "qa",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
      domain: environment === "production" || environment === "qa" ? ".ekoru.cl" : undefined,
    });
    res.json({ token: newToken, success: true });
  } catch {
    res.status(401).json({ message: "Token de acceso inválido" });
  }
};
