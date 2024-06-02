import mongoose from "mongoose";

const DATABASE = process.env.DATABASE_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is Connected");
  } catch (error) {
    console.error("Error connecting to database", error);
    process.exit(1);
  }
};

export default connectDB;
