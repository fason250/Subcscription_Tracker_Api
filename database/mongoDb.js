import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    if (!conn) {
      throw new Error("unable to connect to the database❌❌❌");
    }
    console.log("Database connected: ", conn.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectMongoDB;
