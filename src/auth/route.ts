import { Router } from "express";
import { Login, LoginAdmin, RefreshToken, RefreshTokenAdmin } from "./controller";

const auth = Router();

// Seller routes
auth.route("/auth").post(Login);
auth.route("/refresh").post(RefreshToken);

// Admin routes
auth.route("/authAdmin").post(LoginAdmin);
auth.route("/refreshAdmin").post(RefreshTokenAdmin);

export default auth;
