import express from "express";
import {
  submitOnboarding,
  getOnboarding,
} from "./onboardingController";

import { protect } from "../../middleware/authmiddleware";

const router = express.Router();

router.post("/", protect, submitOnboarding);
router.get("/", protect, getOnboarding);

export default router;
