import jwt, { decode } from "jsonwebtoken";

const authorization = async (request, response, next) => {
  try {
    let token;
    if (
      request.headers.authorization &&
      request.headers.authorization.startsWith("Bearer")
    ) {
      token = request.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return response
        .status(401)
        .json({ success: false, message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    request.user = decoded.userId;
    next();
  } catch (error) {
    response.json({
      success: false,
      message: "unauthorized",
      error: error.message,
    });
  }
};

export { authorization };
