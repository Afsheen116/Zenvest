import { DEFAULT_FUNDS } from "@/lib/defaultFunds";

const STORAGE_KEYS = {
  user: "zenvest_user",
  users: "zenvest_users",
  onboarding: "zenvest_onboarding",
  transactions: "zenvest_transactions",
  funds: "zenvest_savings_funds",
};

function readStoredValue(key, fallback) {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallback;
  } catch {
    return fallback;
  }
}

function writeStoredValue(key, value) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(key, JSON.stringify(value));
}

export function getStoredUser() {
  return readStoredValue(STORAGE_KEYS.user, null);
}

export function setStoredUser(user) {
  writeStoredValue(STORAGE_KEYS.user, user);
}

export function clearStoredUser() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(STORAGE_KEYS.user);
}

export function getStoredUsers() {
  return readStoredValue(STORAGE_KEYS.users, []);
}

export function createStoredUser(user) {
  const users = getStoredUsers();
  const nextUser = {
    ...user,
    id: user.id || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  };
  const nextUsers = [...users, nextUser];
  writeStoredValue(STORAGE_KEYS.users, nextUsers);
  return nextUser;
}

export function authenticateStoredUser({ username, password, anonymous }) {
  if (anonymous) {
    return { username: "Guest", anonymous: true };
  }

  const normalizedUsername = username?.trim().toLowerCase();
  const users = getStoredUsers();
  return users.find(
    (user) => user.username?.trim().toLowerCase() === normalizedUsername && user.password === password
  ) || null;
}

export function getStoredOnboarding() {
  return readStoredValue(STORAGE_KEYS.onboarding, {});
}

export function setStoredOnboarding(updates) {
  const current = getStoredOnboarding();
  const nextValue = { ...current, ...updates };
  writeStoredValue(STORAGE_KEYS.onboarding, nextValue);
  return nextValue;
}

export function getStoredTransactions() {
  return readStoredValue(STORAGE_KEYS.transactions, []);
}

export function addStoredTransaction(transaction) {
  const nextTransactions = [
    ...getStoredTransactions(),
    {
      ...transaction,
      _id: transaction._id || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      createdAt: transaction.createdAt || new Date().toISOString(),
    },
  ];

  writeStoredValue(STORAGE_KEYS.transactions, nextTransactions);
  return nextTransactions[nextTransactions.length - 1];
}

export function getStoredFunds() {
  const storedFunds = readStoredValue(STORAGE_KEYS.funds, null);

  if (Array.isArray(storedFunds) && storedFunds.length > 0) {
    return storedFunds;
  }

  const seededFunds = DEFAULT_FUNDS.map((fund, index) => ({
    ...fund,
    _id: fund._id || `fund-${index + 1}`,
    current: fund.current || 0,
  }));

  writeStoredValue(STORAGE_KEYS.funds, seededFunds);
  return seededFunds;
}

export function saveStoredFunds(funds) {
  writeStoredValue(STORAGE_KEYS.funds, funds);
  return funds;
}

export function updateStoredFund(updatedFund) {
  const nextFunds = getStoredFunds().map((fund) =>
    fund._id === updatedFund._id ? updatedFund : fund
  );
  saveStoredFunds(nextFunds);
  return nextFunds;
}
