import mongoose from "mongoose";
import { envVariables } from "../envVariables";

export const connectDB = async () => {
  try {
    await mongoose.connect(envVariables.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};
