
import React from "react";
import { ChangelogItem } from "./ChangelogItem";
import type { ChangelogUpdate } from "../data/updates";

interface ChangelogTimelineProps {
  updates: ChangelogUpdate[];
  onReact: (id: string, emoji: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isAdmin: boolean;
}

export function ChangelogTimeline({
  updates,
  onReact,
  onEdit,
  onDelete,
  isAdmin
}: ChangelogTimelineProps) {
  // Group by version for version headers
  const grouped = updates.reduce((acc, update) => {
    if (!acc[update.version]) acc[update.version] = [];
    acc[update.version].push(update);
    return acc;
  }, {} as Record<string, ChangelogUpdate[]>);

  const versions = Object.keys(grouped).sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));

  return (
    <div className="relative">
      {versions.map((version, idx) => (
        <div key={version}>
          <div className="flex items-center gap-2 mt-8 mb-2">
            <div className="h-0.5 flex-1 bg-gradient-to-r from-indigo-100 to-purple-100 rounded" />
            <span className="text-sm font-mono text-indigo-600 bg-indigo-50 px-3 py-0.5 rounded-full shadow">{version}</span>
            <div className="h-0.5 flex-1 bg-gradient-to-l from-indigo-100 to-purple-100 rounded" />
          </div>
          <div>
            {grouped[version].map((update, i) => (
              <React.Fragment key={update.id}>
                <ChangelogItem
                  update={update}
                  onReact={onReact}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isAdmin={isAdmin}
                />
                {i < grouped[version].length - 1 && (
                  <div className="border-b border-dashed border-gray-200 mx-8" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}