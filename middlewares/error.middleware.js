const errorMiddleware = (error, request, response, next) => {
  const message = error.message || "Internal server error";
  const statusCode = error.statusCode || 500;

  if (error.name === "CastError") {
    message = "Resource not found";
    statusCode = 404;
  }

  if (error.code === 11000) {
    message = "Duplicate field value entered";
    statusCode = 400;
  }

  if (error.name === "ValidationError") {
    message = Object.values(error.errors)
      .map((err) => err.message)
      .join(", ");
    statusCode = 400;
  }

  response.status(statusCode).json({ success: false, error: message });
};

export default errorMiddleware;
