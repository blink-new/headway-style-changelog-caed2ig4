
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
          <div className="flex items-center gap-2 mt-12 mb-4">
            <div className="flex-1 h-0.5 divider-gradient" />
            <span className="text-sm font-mono text-indigo-600 bg-indigo-50 px-3 py-0.5 rounded-full shadow font-semibold tracking-wide">{version}</span>
            <div className="flex-1 h-0.5 divider-gradient" />
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
                  <div className="mx-8 my-2">
                    <div className="divider-gradient" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}