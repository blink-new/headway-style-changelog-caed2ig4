
import React from "react";
import { StatusBadge } from "./StatusBadge";
import { CategoryBadge } from "./CategoryBadge";
import { Reactions } from "./Reactions";
import { Pencil, Trash2 } from "lucide-react";
import type { ChangelogUpdate } from "../data/updates";

interface ChangelogItemProps {
  update: ChangelogUpdate;
  onReact: (id: string, emoji: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isAdmin: boolean;
}

export function ChangelogItem({
  update,
  onReact,
  onEdit,
  onDelete,
  isAdmin
}: ChangelogItemProps) {
  return (
    <div className="relative flex flex-col md:flex-row gap-2 md:gap-4 group fade-in">
      {/* Timeline dot */}
      <div className="absolute left-0 top-8 md:top-6 z-10">
        <div className="timeline-dot" />
      </div>
      {/* Timeline line */}
      <div className="absolute left-2 top-0 h-full timeline-line z-0" />
      <div className="pl-8 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <StatusBadge status={update.status} />
          <span className="text-xs text-gray-400 font-medium">{new Date(update.date).toLocaleDateString()}</span>
          {isAdmin && (
            <span className="ml-auto flex gap-1 opacity-0 group-hover:opacity-100 transition">
              <button
                className="p-1 rounded hover:bg-indigo-50"
                onClick={() => onEdit(update.id)}
                aria-label="Edit"
                type="button"
              >
                <Pencil size={16} />
              </button>
              <button
                className="p-1 rounded hover:bg-red-50"
                onClick={() => onDelete(update.id)}
                aria-label="Delete"
                type="button"
              >
                <Trash2 size={16} />
              </button>
            </span>
          )}
        </div>
        <div className="changelog-card relative">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-extrabold text-lg text-indigo-900 tracking-tight">{update.title}</span>
            {update.categories.map((cat) => (
              <CategoryBadge key={cat} category={cat} />
            ))}
          </div>
          <div className="text-gray-700 mb-2 text-base leading-relaxed">{update.description}</div>
          <Reactions reactions={update.reactions} onReact={(emoji) => onReact(update.id, emoji)} />
        </div>
      </div>
      <div className="hidden md:flex flex-col items-center min-w-[80px]">
        <span className="text-xs font-mono text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full shadow font-semibold tracking-wide">{update.version}</span>
      </div>
    </div>
  );
}