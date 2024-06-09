import mongoose from "mongoose";

const DATABASE = process.env.DATABASE_URL;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(DATABASE, {});
    console.log("Database is Connected");
  } catch (error) {
    console.error("Error connecting to database", error);
    throw new Error("Could not connect to MongoDB");
  }
};

export default connectDB;
