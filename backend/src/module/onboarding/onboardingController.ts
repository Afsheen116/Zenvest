import { Request, Response } from "express";
import * as onboardingService from "./onboardingService";

export const submitOnboarding = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.id;

    const result = await onboardingService.submitOnboarding(
      userId,
      req.body
    );

    res.status(201).json({
      success: true,
      message: result.message,
      onboarding: result.onboarding,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOnboarding = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.id;

    const result = await onboardingService.getOnboarding(userId);

    res.status(200).json({
      success: true,
      onboarding: result.onboarding,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};