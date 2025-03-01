import express from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import { authorization } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:userId", authorization, getUser);

export default userRouter;
