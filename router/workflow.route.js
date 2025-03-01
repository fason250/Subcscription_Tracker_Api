import { Router } from "express";
import sendReminders from "../controllers/workflow.controller.js";

const workFlowRouter = Router();

workFlowRouter.post("/subscription/reminder", sendReminders);

export default workFlowRouter;
