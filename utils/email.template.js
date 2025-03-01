const emailContent = ({
  name,
  subscriptionName,
  renewalDate,
  price,
  paymentMethod,
  year,
}) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Subscription Renewal Reminder</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #007bff;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
      color: #333333;
    }
    .content h2 {
      font-size: 20px;
      margin-bottom: 10px;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 20px;
    }
    .cta-button {
      display: inline-block;
      background-color: #007bff;
      font-weight: bold;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 4px;
      font-size: 16px;
      margin-bottom: 20px;
    }
    .footer {
      text-align: center;
      padding: 20px;
      background-color: #f4f4f4;
      color: #777777;
      font-size: 14px;
    }
    .footer a {
      color: #007bff;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="header">
      <h1>Subscription Renewal Reminder</h1>
    </div>

    <!-- Content -->
    <div class="content">
      <h2>Hello ${name},</h2>
      <p>
        This is a friendly reminder that your subscription for <strong>${subscriptionName}</strong>
        will renew on <strong>${renewalDate}</strong>. The next payment of <strong>${price}</strong>
        will be charged to your <b>${paymentMethod}</b>.
      </p>
      <p>
        If you have any questions or need to update your payment method, please contact us.
      </p>
      <a href="#" class="cta-button" style="color: #ffffff;">Manage Subscription</a>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>
        If you no longer wish to receive these reminders, you can
        <a href="#">unsubscribe here</a>.
      </p>
      <p>
        &copy; ${year} JeyFason Ltd. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>`;
};

export default emailContent;
