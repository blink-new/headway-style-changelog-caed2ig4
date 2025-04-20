
import React, { useState, useEffect } from "react";
import type { ChangelogUpdate, ChangelogCategory, ChangelogStatus } from "../data/updates";

interface AdminModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (update: Omit<ChangelogUpdate, "reactions" | "id">) => void;
  initial?: Omit<ChangelogUpdate, "reactions" | "id">;
}

const statusOptions: { value: ChangelogStatus; label: string }[] = [
  { value: "new", label: "✨ New" },
  { value: "fix", label: "🐛 Fix" },
  { value: "improve", label: "🛠 Improve" }
];

const categoryOptions: ChangelogCategory[] = [
  "UI", "Performance", "API", "Docs", "Security"
];

export function AdminModal({ open, onClose, onSave, initial }: AdminModalProps) {
  const [form, setForm] = useState<Omit<ChangelogUpdate, "reactions" | "id">>(
    initial || {
      version: "",
      date: new Date().toISOString().slice(0, 10),
      status: "new",
      title: "",
      description: "",
      categories: []
    }
  );

  useEffect(() => {
    if (initial) setForm(initial);
    else setForm({
      version: "",
      date: new Date().toISOString().slice(0, 10),
      status: "new",
      title: "",
      description: "",
      categories: []
    });
  }, [initial, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm fade-in">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md animate-fadeIn border border-indigo-100">
        <h2 className="text-lg font-bold mb-4 text-indigo-700">{initial ? "Edit Update" : "Add Update"}</h2>
        <form
          className="flex flex-col gap-3"
          onSubmit={e => {
            e.preventDefault();
            onSave(form);
          }}
        >
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-indigo-700">Version</span>
            <input
              className="input"
              required
              value={form.version}
              onChange={e => setForm(f => ({ ...f, version: e.target.value }))}
              placeholder="e.g. v1.2.0"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-indigo-700">Date</span>
            <input
              className="input"
              type="date"
              required
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-indigo-700">Status</span>
            <select
              className="input"
              value={form.status}
              onChange={e => setForm(f => ({ ...f, status: e.target.value as any }))}
            >
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-indigo-700">Title</span>
            <input
              className="input"
              required
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="Update title"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-indigo-700">Description</span>
            <textarea
              className="input"
              required
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Describe the update"
              rows={3}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-indigo-700">Categories</span>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map(cat => (
                <label key={cat} className="flex items-center gap-1 text-xs font-medium">
                  <input
                    type="checkbox"
                    checked={form.categories.includes(cat)}
                    onChange={e =>
                      setForm(f => ({
                        ...f,
                        categories: e.target.checked
                          ? [...f.categories, cat]
                          : f.categories.filter(c => c !== cat)
                      }))
                    }
                  />
                  {cat}
                </label>
              ))}
            </div>
          </label>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition shadow"
            >
              {initial ? "Save" : "Add"}
            </button>
            <button
              type="button"
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}