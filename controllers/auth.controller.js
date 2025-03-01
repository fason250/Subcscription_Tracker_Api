import bcrypt from "bcryptjs";
import UserModel from "../models/user.model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const signUp = async (request, response, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      body: { name, email, password },
    } = request;

    //check if user is already exist
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      const error = new Error("user already exists");
      error.statusCode = 409;
      throw error;
    }

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );
    const token = jwt.sign({ userId: newUser[0]._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    console.log(newUser);
    response.status(201).json({
      success: true,
      message: "user created successfully",
      data: {
        token,
        user: newUser[0],
      },
    });

    await session.commitTransaction();
  } catch (error) {
    console.log(error._message);
    response.json({ success: false, message: error });
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

const signIn = async (request, response, next) => {
  try {
    const {
      body: { email, password },
    } = request;

    const user = await UserModel.findOne({ email });
    if (!user) {
      const error = new Error("user not found");
      error.statusCode = 404;
      throw error;
    }

    // is password match or valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    response.status(200).json({ success: true, data: { token, user } });
  } catch (error) {
    next(error);
  }
};

const signOut = async (request, response, next) => {};

export { signIn, signUp, signOut };
