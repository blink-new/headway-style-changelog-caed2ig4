
import React from "react";

type Status = "new" | "fix" | "improve";

const statusMap: Record<
  Status,
  { emoji: string; label: string; color: string }
> = {
  new: { emoji: "✨", label: "New", color: "bg-yellow-100 text-yellow-800" },
  fix: { emoji: "🐛", label: "Fix", color: "bg-red-100 text-red-700" },
  improve: { emoji: "🛠", label: "Improve", color: "bg-blue-100 text-blue-800" }
};

export function StatusBadge({ status }: { status: Status }) {
  const { emoji, label, color } = statusMap[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${color} shadow-sm`}
    >
      <span>{emoji}</span>
      {label}
    </span>
  );
}