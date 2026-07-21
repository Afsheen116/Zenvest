import express from "express";
import cors from "cors";
import authRoutes from "./module/auth/authRoutes";


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

export default app;