import aj from "../config/arcjet.js";

const arcjetMiddleware = async (request, response, next) => {
  try {
    const decision = await aj.protect(request, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return response
          .status(429)
          .json({ success: false, message: "Rate limit exceeded" });
      }
      if (decision.reason.isBot()) {
        return response
          .status(403)
          .json({ success: false, message: "Bot detected" });
      }
      response.status(403).json({ success: false, message: "access denied" });
    }
    next();
  } catch (error) {
    console.log(`this is error coming from arcjet ${error}`);
    next(error);
  }
};

export { arcjetMiddleware };
