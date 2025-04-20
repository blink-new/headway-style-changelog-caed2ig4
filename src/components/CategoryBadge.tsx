
import React from "react";

const categoryColors: Record<string, string> = {
  UI: "bg-purple-100 text-purple-700",
  Performance: "bg-green-100 text-green-700",
  API: "bg-cyan-100 text-cyan-700",
  Docs: "bg-orange-100 text-orange-700",
  Security: "bg-pink-100 text-pink-700"
};

export function CategoryBadge({ category }: { category: string }) {
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[category] || "bg-gray-100 text-gray-700"}`}
    >
      {category}
    </span>
  );
}