import UserModel from "../models/user.model.js";

const getUsers = async (request, response, next) => {
  try {
    const users = await UserModel.find({});
    response.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

const getUser = async (request, response, next) => {
  try {
    const { userId } = request.params;
    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      const error = new Error("user not found");
      error.statusCode = 404;
      throw error;
    }

    response.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export { getUser, getUsers };
