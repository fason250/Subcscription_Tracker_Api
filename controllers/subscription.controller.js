import SubscriptionModel from "../models/subscription.model.js";
import worksFlowClient from "../config/upstash.js";
import mongoose from "mongoose";

const createSubscription = async (request, response, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const subscription = await SubscriptionModel.create(
      [
        {
          ...request.body,
          user: request.user,
        },
      ],
      { session }
    );

    const { workflowRunId } = await worksFlowClient.trigger({
      url: `${process.env.SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription[0]._id,
      },
      headers: {
        "Content-Type": "application/json",
      },
      retries: 0,
    });

    await session.commitTransaction();
    session.endSession();

    response
      .status(201)
      .json({ success: true, data: { subscription, workflowRunId } });
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    console.log(error);
    next(error);
  }
};

const getUserSubscription = async (request, response, next) => {
  try {
    if (request.user !== request.params.userId) {
      const error = new Error("you aren't the owner of this account");
      error.statusCode = 401;
      throw error;
    }

    const subscriptions = await SubscriptionModel.find({
      user: request.params.userId,
    });

    response.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

const getSubscriptionDetails = async (request, response, next) => {
  try {
    const { id } = request.params;
    if (!id) {
      const error = new Error("please provide the subscription id");
      error.statusCode = 401;
      throw error;
    }

    const subscription = await SubscriptionModel.findById({ _id: id });

    if (!subscription) {
      return response
        .status(401)
        .json({ success: false, message: "no data found" });
    }

    response.status(200).json({ success: true, data: subscription });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { createSubscription, getUserSubscription, getSubscriptionDetails };
