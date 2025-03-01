import dayjs from "dayjs";
import emailContent from "./email.template.js";
import transporter from "../config/nodemailer.js";

const sendReminderEmail = async ({ to, type, subscription }) => {
  if (!to || !type) {
    throw new Error("Missing required parameters");
  }
  const emailInfo = {
    name: subscription.user.name,
    subscriptionName: subscription.name,
    renewalDate: dayjs(subscription.renewalDate).format("MMM D, YYYY"),
    price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
    paymentMethod: subscription.paymentMethod,
    year: new Date().getFullYear(),
  };

  const message = emailContent(emailInfo);

  const mailOptions = {
    from: `"Jey Fason Ltd" jeyfason58@gmail.com`,
    to: to,
    subject: "Subscription Renewal Reminder",
    html: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    console.log("does email being sent");
    if (error) {
      console.error("error sending email ", error);
    } else {
      console.log("email sent ", info.response);
    }
  });
};

export default sendReminderEmail;
