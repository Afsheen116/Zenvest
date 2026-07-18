"use client";

import { useState, useEffect } from "react";

export default function SetTargetModal({ open, fund, onClose, onSaved }) {
  const [target, setTarget] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open && fund) {
      setTarget(fund.target);
      setError("");
    }
  }, [open, fund]);

  if (!open || !fund) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const numericTarget = Number(target);
    if (!numericTarget || numericTarget <= 0) {
      setError("Please enter a valid target amount.");
      return;
    }

    setSubmitting(true);
    try {
      onSaved({
        ...fund,
        target: numericTarget,
      });
      onClose();
    } catch (err) {
      setError(err.message || "Failed to update target.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 py-6 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="soft-card-strong w-full max-w-sm rounded-[24px] p-5 sm:p-6 max-h-[calc(100vh-3rem)] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-gray-800 pr-4">
            Set {fund.name} Target
          </h3>
          <button
            onClick={onClose}
            className="text-2xl text-zv-gray-400 hover:text-gray-600 leading-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Amount (â‚¹)
            </label>
            <input
              type="number"
              min="1"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-zv-gray-200 focus:outline-none focus:ring-2 focus:ring-zv-primary/30 focus:border-zv-primary"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex flex-col-reverse sm:flex-row gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border-2 border-zv-gray-200 text-gray-600 font-medium hover:border-zv-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-2.5 rounded-xl zv-gradient text-white font-semibold disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Set Target"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
