import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("MONGO_URI =", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI as string);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database Connection Failed");
    console.error(error);
  }
};

export default connectDB;