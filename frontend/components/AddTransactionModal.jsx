"use client";

import { useState, useEffect } from "react";
import { addStoredTransaction } from "@/lib/frontendData";

const EXPENSE_CATEGORIES = [
  { value: "Food", label: "ðŸ” Food" },
  { value: "Shopping", label: "ðŸ›ï¸ Shopping" },
  { value: "Transport", label: "ðŸš— Transport" },
  { value: "Entertainment", label: "ðŸŽ® Entertainment" },
  { value: "Bills", label: "ðŸ“‹ Bills" },
  { value: "Gym", label: "ðŸ’ª Gym" },
  { value: "Subscription", label: "ðŸ“º Subscription" },
  { value: "Education", label: "ðŸ“š Education" },
  { value: "Other", label: "ðŸ’« Other" },
];

const INCOME_CATEGORIES = [
  { value: "Salary", label: "ðŸ’¼ Salary" },
  { value: "Freelancer", label: "ðŸ’» Freelancer" },
  { value: "Internship", label: "ðŸŽ“ Internship" },
  { value: "Other", label: "ðŸ’° Other" },
];

export default function AddTransactionModal({
  open,
  type,
  defaultCategory,
  onClose,
  onSaved,
}) {
  const [category, setCategory] = useState(defaultCategory || "");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  useEffect(() => {
    if (open) {
      setCategory(defaultCategory || "");
      setAmount("");
      setNote("");
      setError("");
    }
  }, [open, defaultCategory]);

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!category || !amount || Number(amount) <= 0) {
      setError("Please select a category and enter a valid amount.");
      return;
    }

    setSubmitting(true);
    try {
      const transaction = addStoredTransaction({
        type,
        category,
        amount: Number(amount),
        note,
      });
      onSaved(transaction);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to save.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 py-6 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="soft-card-strong w-full max-w-sm rounded-[24px] p-5 sm:p-6 max-h-[calc(100vh-3rem)] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-gray-800">
            Add {type === "income" ? "Income" : "Expense"}
          </h3>
          <button
            onClick={onClose}
            className="text-2xl text-zv-gray-400 hover:text-gray-600 leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-zv-gray-200 focus:outline-none focus:ring-2 focus:ring-zv-primary/30 focus:border-zv-primary bg-white"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (â‚¹)
            </label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-2.5 rounded-xl border border-zv-gray-200 focus:outline-none focus:ring-2 focus:ring-zv-primary/30 focus:border-zv-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Note (Optional)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note"
              className="w-full px-4 py-2.5 rounded-xl border border-zv-gray-200 focus:outline-none focus:ring-2 focus:ring-zv-primary/30 focus:border-zv-primary"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl zv-gradient text-white font-semibold disabled:opacity-50"
          >
            {submitting ? "Saving..." : `Add ${type === "income" ? "Income" : "Expense"}`}
          </button>
        </form>
      </div>
    </div>
  );
}
