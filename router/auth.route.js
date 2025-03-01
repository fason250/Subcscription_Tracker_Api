import express from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
const authRouter = express.Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);

export default authRouter;
