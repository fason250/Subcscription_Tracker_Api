import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import SubscriptionModel from "../models/subscription.model.js";
import sendReminderEmail from "../utils/sendEmail.js";
import dayjs from "dayjs";

const REMINDERS = [7, 5, 2, 1];

const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);
  if (!subscription || subscription.status !== "active") {
    console.log(`Subscription ${subscriptionId} is not active or not found.`);
    return;
  }

  const renewalDate = dayjs(subscription.renewalDate);

  // check if renewal date has passed
  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `renewal date has passed for subscription ${subscriptionId}. stopping workflow.`
    );
    return;
  }

  //schedule reminders
  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    // only schedule reminders for future dates
    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `Reminder ${daysBefore} days before `,
        reminderDate
      );
    }

    if (dayjs().isSame(reminderDate, "day")) {
      await triggerReminder(
        context,
        `Reminder ${daysBefore} days before.`,
        subscription
      );
    }
  }
});

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label, subscription) => {
  return await context.run(label, async () => {
    console.log(`Triggering ${label} reminder`);
    await sendReminderEmail({
      to: subscription.user.email,
      type: label,
      subscription,
    });
  });
};

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", async () => {
    try {
      return await SubscriptionModel.findById(subscriptionId).populate(
        "user",
        "name email"
      );
    } catch (error) {
      console.log("error fetching subscription ", error);
      throw error;
    }
  });
};

export default sendReminders;
