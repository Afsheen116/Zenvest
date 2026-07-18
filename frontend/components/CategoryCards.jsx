"use client";

import { EXPENSE_CATEGORY_ICONS, EXPENSE_CATEGORY_ORDER } from "@/lib/categoryMeta";

export default function CategoryCards({ categoryTotals, onCategoryClick }) {
  const entries = EXPENSE_CATEGORY_ORDER.map((cat) => [cat, categoryTotals[cat] || 0]).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
      {entries.map(([category, amount]) => (
        <button
          key={category}
          onClick={() => onCategoryClick?.(category)}
          className="flex min-w-0 flex-col items-center gap-1 rounded-xl border border-zv-gray-200 bg-white p-2 text-center transition hover:border-zv-primary hover:shadow-md sm:p-4"
        >
          <span className="text-xl sm:text-2xl">{EXPENSE_CATEGORY_ICONS[category]}</span>
          <span className="text-[11px] font-medium leading-tight text-gray-600 break-words sm:text-xs">
            {category}
          </span>
          <span className="text-sm font-semibold text-gray-800 break-words">
            ₹{amount.toLocaleString("en-IN")}
          </span>
        </button>
      ))}
    </div>
  );
}
