import Onboarding, { IOnboarding } from "./Onboarding";
import User from "../auth/User";

export const submitOnboarding = async (
  userId: string,
  onboardingData: Partial<IOnboarding>
) => {
  // Check if onboarding already exists
  const existingOnboarding = await Onboarding.findOne({
    user: userId,
  });

  if (existingOnboarding) {
    throw new Error("Onboarding has already been completed.");
  }

  // Create onboarding
  const onboarding = await Onboarding.create({
    user: userId,
    ...onboardingData,
  });

  // Update user
  await User.findByIdAndUpdate(userId, {
    onboardingCompleted: true,
  });

  return {
    message: "Onboarding completed successfully.",
    onboarding,
  };
};

export const getOnboarding = async (userId: string) => {
  const onboarding = await Onboarding.findOne({
    user: userId,
  });

  if (!onboarding) {
    throw new Error("Onboarding not found.");
  }

  return {
    onboarding,
  };
};