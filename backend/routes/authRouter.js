import { Router } from "express";

import { login, logout, register } from "../controllers/authController.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middleware/validationMiddleware.js";
const authRouter = Router();

authRouter.post("/register", validateRegisterInput, register);
authRouter.post("/login", validateLoginInput, login);
authRouter.get("/logout", logout);
export default authRouter;
