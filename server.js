import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./router/auth.route.js";
import userRouter from "./router/users.route.js";
import subscriptionRouter from "./router/subscription.route.js";
import connectMongoDB from "./database/mongoDb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import workFlowRouter from "./router/workflow.route.js";
import { arcjetMiddleware } from "./middlewares/arcjet.middleware.js";
import { config } from "dotenv";

config();
// setting up server
const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

//Api endpoints
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/workflows", workFlowRouter);

app.get("/", (request, response) => {
  return response.json("welcome to my Api where you can track a subscription ");
});

//handling error after response
app.use(errorMiddleware);

app.listen(PORT, async () => {
  //connecting to database
  await connectMongoDB();
  console.log(`server is listening to PORT ${PORT}`);
});
