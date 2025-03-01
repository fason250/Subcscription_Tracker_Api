import express from "express";
import { authorization } from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getUserSubscription,
  getSubscriptionDetails,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = express.Router();

// create subscription
subscriptionRouter.post("/", authorization, createSubscription);
//get user subscription
subscriptionRouter.get("/user/:userId", authorization, getUserSubscription);
//get subscription details
subscriptionRouter.get("/:id", authorization, getSubscriptionDetails);
export default subscriptionRouter;
