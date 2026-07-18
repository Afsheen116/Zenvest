"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { EXPENSE_CATEGORY_ORDER, EXPENSE_CATEGORY_COLORS } from "@/lib/categoryMeta";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SpendingPieChart({ categoryTotals }) {
  const labelsWithData = EXPENSE_CATEGORY_ORDER.filter(
    (cat) => (categoryTotals[cat] || 0) > 0
  );

  const totalSpent = Object.values(categoryTotals).reduce((a, b) => a + b, 0);

  if (labelsWithData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <p className="text-zv-gray-400 text-sm">
          No expenses yet. Add one to see your Spending DNA 🧬
        </p>
      </div>
    );
  }

  const data = {
    labels: labelsWithData,
    datasets: [
      {
        data: labelsWithData.map((cat) => categoryTotals[cat]),
        backgroundColor: labelsWithData.map((cat) => EXPENSE_CATEGORY_COLORS[cat]),
        borderColor: "#ffffff",
        borderWidth: 3,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "62%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: { family: "var(--font-poppins), sans-serif", size: 12, weight: "500" },
          color: "#1f2937",
          padding: 14,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed;
            const percentage = ((value / totalSpent) * 100).toFixed(1);
            return `${context.label}: ₹${value.toLocaleString("en-IN")} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="relative h-64 sm:h-72">
      <Doughnut data={data} options={options} />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 pb-12 sm:px-10 sm:pb-10">
        <span className="break-words text-center text-lg font-bold text-gray-800 sm:text-xl">
          ₹{totalSpent.toLocaleString("en-IN")}
        </span>
        <span className="text-xs text-zv-gray-400">Total Spent</span>
      </div>
    </div>
  );
}
