export const ONBOARDING_STEPS = [
  {
    field: "age",
    type: "choice",
    title: "How old are you?",
    options: [
      { value: "under18", label: "Under 18 years" },
      { value: "18-24", label: "18 to 24 years" },
      { value: "25-34", label: "25 to 34 years" },
    ],
  },
  {
    field: "firstTime",
    type: "choice",
    title: "Is this your first time trying to manage your finances?",
    options: [
      { value: "yes", label: "Yes 🚩" },
      { value: "app", label: "I have used an app before 📱" },
      { value: "manual", label: "I have budgeted manually" },
    ],
  },
  {
    field: "stress",
    type: "slider",
    title: "How stressed do you feel about money?",
    min: 0,
    max: 100,
    default: 50,
    messageFor: (value) => {
      if (value <= 20) return "Not at all, I am increasing my savings 💰";
      if (value <= 40) return "Just a little, there is room for improvement 📈";
      if (value <= 60) return "I feel stressed about it from time to time 😟";
      if (value <= 80) return "I worry about my finances daily 😰";
      return "A lot, so much it affects my life 😱";
    },
    statsMessage:
      "You are not alone. 29% are extremely stressed about money 😰. 37% feel somewhat stressed 😟. We are here to help you 💪.",
  },
  {
    field: "moneyTracking",
    type: "choice",
    title: "Do you often feel like you don't know where the money went?",
    options: [
      { value: "sometimes", label: "Yep, sometimes, but not always 😕" },
      { value: "on_top", label: "Nope, I am on top of it 👍" },
    ],
  },
  {
    field: "moneyGoes",
    type: "choice",
    title: "Where does most of your money go?",
    options: [
      { value: "rent", label: "Rent 🏠" },
      { value: "food_groceries", label: "Food & Groceries 🛒" },
      { value: "transport", label: "Transport 🚗" },
      { value: "bills_utilities", label: "Bills & Utilities 💡" },
      { value: "family", label: "Family 👨‍👩‍👧‍👦" },
    ],
  },
  {
    field: "debts",
    type: "choice",
    title:
      "Do you have any other debts, like auto loan, student loan, personal loan or anything?",
    options: [
      { value: "yes", label: "Yes 💸" },
      { value: "no", label: "No loans, I am free currently 🎉" },
    ],
  },
  {
    field: "incomeSources",
    type: "choice",
    title: "What are your money coming resources?",
    options: [
      { value: "pocket_money", label: "Pocket money 💵" },
      { value: "internship", label: "Internship 💼" },
      { value: "freelancing", label: "Freelancing 💻" },
      { value: "others", label: "Others 🤔" },
    ],
  },
  {
    field: "payday",
    type: "choice",
    title: "Do you often run out of money before the salary payday?",
    options: [
      { value: "yes", label: "Yes, once in a while 😅" },
      { value: "no", label: "No, I'll always leave some room 💰" },
    ],
  },
  {
    field: "incomeSituation",
    type: "choice",
    title: "What's your monthly income situation?",
    options: [
      { value: "0-5000", label: "0 to 5,000 💵" },
      { value: "5000-10000", label: "5,000 to 10,000 💰" },
      { value: "10000-25000", label: "10,000 to 25,000 💸" },
      { value: "25000+", label: "25,000 plus 💎" },
    ],
  },
  {
    field: "spendingHabit",
    type: "choice",
    title: "Be honest, how do you usually spend?",
    options: [
      { value: "plan", label: "I plan everything 📋" },
      { value: "try_fail", label: "I try, but fail sometimes 😅" },
      { value: "no_think", label: "I spend without thinking 🛒" },
    ],
  },
  {
    field: "budgetMess",
    type: "choice",
    title: "What messes up your budget the most?",
    options: [
      { value: "impulse", label: "Impulse buying 🛍️" },
      { value: "food", label: "Food cravings 🍔" },
      { value: "subscriptions", label: "Subscriptions 📺" },
      { value: "not_tracking", label: "Not tracking habit 📊" },
    ],
  },
  {
    field: "goals",
    type: "choice",
    title: "What are your current financial goals?",
    options: [
      { value: "education", label: "Education 🎓" },
      { value: "educational_saving", label: "Educational Savings 📚" },
      { value: "trip_saving", label: "Trip Savings ✈️" },
      { value: "secure_funds", label: "Secure Funds 🛡️" },
      { value: "health_saving", label: "Health Sector Savings 🏥" },
    ],
  },
];

export const SKIPPED = "skipped";
