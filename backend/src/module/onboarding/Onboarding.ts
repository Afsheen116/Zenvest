import mongoose, { Document, Schema, Model } from "mongoose";

export interface IOnboarding extends Document {
  user: mongoose.Types.ObjectId;

  age: "under18" | "18-24" | "25-34";

  firstTime: "yes" | "app" | "manual";

  stress: number;

  moneyTracking: "sometimes" | "on_top";

  moneyGoes:
    | "Rent"| "Food/Groceries"| "Transport"| "Bills/Utilities"| "Family";

  debts: "yes" | "no";

  incomeSources:
    | "Job"| "Internship"| "Freelancing"| "Others";

  payday: "yes" | "no";

  incomeSituation:
    | "0-5000"| "5000-10000"| "10000-25000"| "25000+";

  spendingHabit:
    | "plan"| "try_fail"| "no_think";

  budgetMess:
    | "impulse"| "food" | "subscriptions" | "not_tracking";

  goals:
    | "education"| "educational_saving" | "trip_saving"| "secure_funds" | "health_saving";

  createdAt: Date;
  updatedAt: Date;
}

const OnboardingSchema = new Schema<IOnboarding>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    age: {
      type: String,
      enum: ["under18", "18-24", "25-34"],
      required: true,
    },

    firstTime: {
      type: String,
      enum: ["yes", "app", "manual"],
      required: true,
    },

    stress: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },

    moneyTracking: {
      type: String,
      enum: ["sometimes", "on_top"],
      required: true,
    },

    moneyGoes: {
      type: String,
      enum: [
        "Rent",
        "Food/Groceries",
        "Transport",
        "Bills/Utilities",
        "Family",
      ],
      required: true,
    },

    debts: {
      type: String,
      enum: ["yes", "no"],
      required: true,
    },

    incomeSources: {
      type: String,
      enum: [
        "Job",
        "Internship",
        "Freelancing",
        "Others",
      ],
      required: true,
    },

    payday: {
      type: String,
      enum: ["yes", "no"],
      required: true,
    },

    incomeSituation: {
      type: String,
      enum: [
        "0-5000",
        "5000-10000",
        "10000-25000",
        "25000+",
      ],
      required: true,
    },

    spendingHabit: {
      type: String,
      enum: [
        "plan",
        "try_fail",
        "no_think",
      ],
      required: true,
    },

    budgetMess: {
      type: String,
      enum: [
        "impulse",
        "food",
        "subscriptions",
        "not_tracking",
      ],
      required: true,
    },

    goals: {
      type: String,
      enum: [
        "education",
        "educational_saving",
        "trip_saving",
        "secure_funds",
        "health_saving",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Onboarding: Model<IOnboarding> =
  mongoose.models.Onboarding ||
  mongoose.model<IOnboarding>("Onboarding", OnboardingSchema);

export default Onboarding;