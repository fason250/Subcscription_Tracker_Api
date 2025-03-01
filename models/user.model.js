import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user name is required"],
      minLength: 2,
      maxLength: 30,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "invalid email address",
      ],
      lowercase: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, "password is required"],
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
