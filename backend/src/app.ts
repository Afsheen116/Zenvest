import express from "express";
import cors from "cors";
import authRoutes from "./module/auth/authRoutes";
import onboardingRoutes from "./module/onboarding/onboardingRoutes";


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/onboarding", onboardingRoutes);

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

export default app;