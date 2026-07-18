"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import SpendingPieChart from "@/components/SpendingPieChart";
import CategoryCards from "@/components/CategoryCards";
import AddTransactionModal from "@/components/AddTransactionModal";
import { getStoredTransactions } from "@/lib/frontendData";

export default function DashboardPage() {
  const { user, loading: authLoading, logout } = useAuth();

  const [summary, setSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [modalState, setModalState] = useState({ open: false, type: "expense", category: "" });

  const fetchSummary = useCallback(() => {
    try {
      const transactions = getStoredTransactions();
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      const expenseTransactions = transactions.filter((t) => t.type === "expense");
      const incomeTransactions = transactions.filter((t) => t.type === "income");

      const categoryTotals = expenseTransactions.reduce((acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + Number(transaction.amount || 0);
        return acc;
      }, {});

      const monthlyExpenses = expenseTransactions
        .filter((transaction) => {
          const createdAt = new Date(transaction.createdAt || 0);
          return createdAt >= monthStart && createdAt <= monthEnd;
        })
        .reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0);

      setSummary({
        categoryTotals,
        monthlyExpenses,
        totalExpenses: expenseTransactions.reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0),
        totalIncome: incomeTransactions.reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0),
      });
    } catch (err) {
      console.error("Failed to load summary", err);
    } finally {
      setLoadingSummary(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  function openExpenseModal(category = "") {
    setModalState({ open: true, type: "expense", category });
  }

  function openIncomeModal(category = "") {
    setModalState({ open: true, type: "income", category });
  }

  function closeModal() {
    setModalState((s) => ({ ...s, open: false }));
  }

  function handleSaved() {
    fetchSummary();
  }

  const genderGreeting =
    user?.gender === "Male"
      ? "Hey Batman"
      : user?.gender === "Female"
      ? "Hey Girlypop"
      : `Hey ${user?.username || "there"}!`;

  if (authLoading) {
    return <div className="p-10 text-center text-zv-gray-400">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50">
      <header className="sticky top-0 z-30 border-b border-white/70 bg-white/85 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <h1 className="text-lg font-bold sm:text-xl zv-gradient-text">Zenvest</h1>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hidden max-w-40 truncate rounded-full bg-violet-50 px-3 py-1 text-sm text-gray-600 sm:inline">
              {user?.username}
            </span>
            <button
              onClick={logout}
              className="text-sm font-medium text-red-500 transition hover:text-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-4 px-3 py-4 sm:px-6 sm:py-6 lg:gap-6">
        <section className="overflow-hidden rounded-[28px] bg-gradient-to-br from-violet-600 via-violet-500 to-sky-500 p-4 text-white shadow-[0_24px_70px_rgba(139,92,246,0.18)] sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-medium text-violet-100">Your money snapshot</p>
              <h2 className="mt-1 text-xl font-semibold leading-tight sm:text-2xl">
                {genderGreeting}
              </h2>
              <p className="mt-2 text-sm text-violet-100/90">
                Welcome back — here is a simple view of your spending habits.
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 px-3 py-2 text-sm backdrop-blur-sm">
              <p className="text-violet-100">Today&apos;s focus</p>
              <p className="font-semibold">Stay on track</p>
            </div>
          </div>
        </section>

        <section className="soft-card rounded-[24px] p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h3 className="text-lg font-semibold text-gray-800">Your Spending DNA</h3>
            <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-600">
              Live view
            </span>
          </div>
          {loadingSummary ? (
            <div className="flex h-64 items-center justify-center rounded-2xl bg-gray-50 text-sm text-zv-gray-400">
              Loading chart...
            </div>
          ) : (
            <SpendingPieChart categoryTotals={summary?.categoryTotals || {}} />
          )}
        </section>

        <section className="grid grid-cols-2 gap-2 sm:gap-4">
          <button
            onClick={() => openExpenseModal()}
            className="soft-card flex min-h-[96px] flex-col items-center justify-center gap-1 rounded-[20px] border border-transparent p-3 text-center transition hover:-translate-y-1 hover:border-violet-300 hover:shadow-md sm:min-h-[110px]"
          >
            <span className="text-2xl">📖</span>
            <span className="text-sm font-semibold text-gray-700">Add Expense</span>
          </button>
          <button
            onClick={() => openIncomeModal()}
            className="soft-card flex min-h-[96px] flex-col items-center justify-center gap-1 rounded-[20px] border border-transparent p-3 text-center transition hover:-translate-y-1 hover:border-emerald-400 hover:shadow-md sm:min-h-[110px]"
          >
            <span className="text-2xl">💰</span>
            <span className="text-sm font-semibold text-gray-700">Add Income</span>
          </button>
        </section>

        <section className="soft-card rounded-[24px] p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
            <span className="text-sm text-zv-gray-400">Tap to add an expense</span>
          </div>
          {loadingSummary ? (
            <p className="text-sm text-zv-gray-400">Loading...</p>
          ) : (
            <CategoryCards
              categoryTotals={summary?.categoryTotals || {}}
              onCategoryClick={openExpenseModal}
            />
          )}
        </section>

        {summary && (
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <StatCard label="This Month" value={summary.monthlyExpenses} />
            <StatCard label="Total Spent" value={summary.totalExpenses} />
            <StatCard label="Total Income" value={summary.totalIncome} color="emerald" />
          </section>
        )}

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <a
            href="/savings"
            className="soft-card flex items-center justify-center gap-2 rounded-[20px] py-4 text-center font-medium text-gray-700 transition hover:-translate-y-1"
          >
            🏦 Savings Goals
          </a>
          <a
            href="/chatbot"
            className="soft-card flex items-center justify-center gap-2 rounded-[20px] py-4 text-center font-medium text-gray-700 transition hover:-translate-y-1"
          >
            🤖 AI Assistant
          </a>
        </section>
      </main>

      <AddTransactionModal
        open={modalState.open}
        type={modalState.type}
        defaultCategory={modalState.category}
        onClose={closeModal}
        onSaved={handleSaved}
      />
    </div>
  );
}

function StatCard({ label, value, color = "violet" }) {
  const colorClass = color === "emerald" ? "text-emerald-600" : "text-violet-600";
  return (
    <div className="soft-card rounded-xl p-4 text-center">
      <p className="mb-1 text-xs text-zv-gray-400">{label}</p>
      <p className={`break-words text-base font-bold sm:text-lg ${colorClass}`}>
        ₹{(value || 0).toLocaleString("en-IN")}
      </p>
    </div>
  );
}

