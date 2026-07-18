import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db";
import startServer from "./server";

const bootstrap = async (): Promise<void> => {
  try {
    await connectDB();
    startServer();
  } catch (error) {
    console.error("Application failed to start");
    console.error(error);
  }
};

bootstrap();