"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import SetTargetModal from "@/components/SetTargetModal";
import AddMoneyModal from "@/components/AddMoneyModal";
import { getStoredFunds, saveStoredFunds } from "@/lib/frontendData";

export default function SavingsPage() {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [targetModalFund, setTargetModalFund] = useState(null);
  const [addMoneyFund, setAddMoneyFund] = useState(null);

  const fetchFunds = useCallback(() => {
    try {
      setFunds(getStoredFunds());
    } catch (err) {
      console.error("Failed to load savings funds", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFunds();
  }, [fetchFunds]);

  function handleFundUpdated(updatedFund) {
    const nextFunds = funds.map((fund) => (fund._id === updatedFund._id ? updatedFund : fund));
    setFunds(nextFunds);
    saveStoredFunds(nextFunds);
  }

  const totalCurrent = funds.reduce((sum, f) => sum + f.current, 0);
  const totalTarget = funds.reduce((sum, f) => sum + f.target, 0);
  const totalPercentage = totalTarget > 0 ? Math.min((totalCurrent / totalTarget) * 100, 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50">
      <header className="sticky top-0 z-30 border-b border-white/70 bg-white/85 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/dashboard"
              className="text-sm text-zv-gray-400 hover:text-gray-700 transition"
            >
              ← Back
            </Link>
            <h1 className="text-lg sm:text-xl font-bold zv-gradient-text">Zenvest</h1>
          </div>
          <span className="text-sm text-gray-600">Savings Goals 💰</span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 sm:space-y-8">
        <section className="soft-card rounded-[24px] p-5 text-center sm:p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Total Savings Progress 📈
          </h2>
          <p className="text-2xl sm:text-3xl font-bold zv-gradient-text mb-4 break-words">
            ₹{totalCurrent.toLocaleString("en-IN")}
          </p>
          <div className="w-full h-3 bg-zv-gray-100 rounded-full overflow-hidden mb-2">
            <div
              className="h-full zv-gradient transition-all duration-500"
              style={{ width: `${totalPercentage}%` }}
            />
          </div>
          <p className="text-xs text-zv-gray-400">Across all your savings goals</p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Your Savings Funds 🎯
          </h3>
          {loading ? (
            <p className="text-zv-gray-400 text-sm">Loading your funds...</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {funds.map((fund) => (
                <FundCard
                  key={fund._id}
                  fund={fund}
                  onSetTarget={() => setTargetModalFund(fund)}
                  onAddMoney={() => setAddMoneyFund(fund)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <SetTargetModal
        open={!!targetModalFund}
        fund={targetModalFund}
        onClose={() => setTargetModalFund(null)}
        onSaved={handleFundUpdated}
      />
      <AddMoneyModal
        open={!!addMoneyFund}
        fund={addMoneyFund}
        onClose={() => setAddMoneyFund(null)}
        onSaved={handleFundUpdated}
      />
    </div>
  );
}

function FundCard({ fund, onSetTarget, onAddMoney }) {
  const percentage = fund.target > 0 ? Math.min((fund.current / fund.target) * 100, 100) : 0;

  return (
    <div className="soft-card rounded-[22px] p-4 sm:p-5">
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl">{fund.icon}</span>
        <h4 className="font-semibold text-gray-800 leading-snug">{fund.name}</h4>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between gap-4 text-sm">
          <span className="text-zv-gray-400">Target:</span>
          <span className="font-medium text-gray-700 text-right break-words">
            ₹{fund.target.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex justify-between gap-4 text-sm">
          <span className="text-zv-gray-400">Current:</span>
          <span className="font-medium text-gray-700 text-right break-words">
            ₹{fund.current.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="w-full h-2 bg-zv-gray-100 rounded-full overflow-hidden mb-1">
          <div
            className="h-full zv-gradient transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-xs text-zv-gray-400">{Math.round(percentage)}%</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={onSetTarget}
          className="flex-1 py-2 rounded-xl border-2 border-zv-gray-200 text-sm font-medium text-gray-600 hover:border-zv-primary hover:text-zv-primary transition"
        >
          Set Target
        </button>
        <button
          onClick={onAddMoney}
          className="flex-1 py-2 rounded-xl zv-gradient text-white text-sm font-medium transition"
        >
          Add Money
        </button>
      </div>
    </div>
  );
}
