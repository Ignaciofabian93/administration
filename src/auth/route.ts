import { Router } from "express";
import { LoginAdmin, RefreshTokenAdmin } from "./controller";

const auth = Router();

// Admin routes
auth.route("/authAdmin").post(LoginAdmin);
auth.route("/refreshAdmin").post(RefreshTokenAdmin);

export default auth;
