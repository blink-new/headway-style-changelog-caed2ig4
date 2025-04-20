
import React, { useState, useEffect } from "react";
import { ChangelogTimeline } from "./components/ChangelogTimeline";
import { AdminModal } from "./components/AdminModal";
import { initialUpdates, ChangelogUpdate } from "./data/updates";
import { Plus, LogIn, LogOut } from "lucide-react";

const STORAGE_KEY = "changelog_updates";
const ADMIN_KEY = "changelog_is_admin";

function loadUpdates(): ChangelogUpdate[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return initialUpdates;
  try {
    return JSON.parse(raw);
  } catch {
    return initialUpdates;
  }
}

function saveUpdates(updates: ChangelogUpdate[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updates));
}

export default function App() {
  const [updates, setUpdates] = useState<ChangelogUpdate[]>([]);
  const [admin, setAdmin] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    setUpdates(loadUpdates());
    setAdmin(localStorage.getItem(ADMIN_KEY) === "1");
  }, []);

  useEffect(() => {
    saveUpdates(updates);
  }, [updates]);

  function handleReact(id: string, emoji: string) {
    setUpdates((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              reactions: {
                ...u.reactions,
                [emoji]: (u.reactions[emoji] || 0) + 1
              }
            }
          : u
      )
    );
  }

  function handleAdd(update: Omit<ChangelogUpdate, "reactions" | "id">) {
    setUpdates((prev) => [
      {
        ...update,
        id: Date.now().toString(),
        reactions: {}
      },
      ...prev
    ]);
    setModalOpen(false);
  }

  function handleEdit(update: Omit<ChangelogUpdate, "reactions" | "id">) {
    if (!editId) return;
    setUpdates((prev) =>
      prev.map((u) =>
        u.id === editId
          ? { ...u, ...update }
          : u
      )
    );
    setEditId(null);
    setModalOpen(false);
  }

  function handleDelete(id: string) {
    if (!window.confirm("Delete this update?")) return;
    setUpdates((prev) => prev.filter((u) => u.id !== id));
  }

  function openEdit(id: string) {
    setEditId(id);
    setModalOpen(true);
  }

  function openAdd() {
    setEditId(null);
    setModalOpen(true);
  }

  function getEditInitial() {
    if (!editId) return undefined;
    const u = updates.find((u) => u.id === editId);
    if (!u) return undefined;
    // Omit id and reactions
    const { id, reactions, ...rest } = u;
    return rest;
  }

  function toggleAdmin() {
    setAdmin((a) => {
      localStorage.setItem(ADMIN_KEY, !a ? "1" : "0");
      return !a;
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 font-sans">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-indigo-700 tracking-tight">Changelog</span>
          <span className="ml-2 text-xs font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Headway-style</span>
        </div>
        <div className="flex items-center gap-2">
          {admin && (
            <button
              className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-indigo-700 transition shadow"
              onClick={openAdd}
            >
              <Plus size={16} /> Add Update
            </button>
          )}
          <button
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            onClick={toggleAdmin}
          >
            {admin ? <><LogOut size={16} /> Admin Out</> : <><LogIn size={16} /> Admin In</>}
          </button>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-4 py-10">
        <ChangelogTimeline
          updates={updates}
          onReact={handleReact}
          onEdit={openEdit}
          onDelete={handleDelete}
          isAdmin={admin}
        />
        {updates.length === 0 && (
          <div className="text-center text-gray-400 mt-16">
            <span className="text-4xl">📝</span>
            <div className="mt-2 text-lg">No updates yet. Stay tuned!</div>
          </div>
        )}
      </main>
      <AdminModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditId(null); }}
        onSave={editId ? handleEdit : handleAdd}
        initial={getEditInitial()}
      />
      <footer className="text-center text-xs text-gray-400 py-6">
        Built with <span className="text-indigo-500 font-bold">Blink</span> · {new Date().getFullYear()}
      </footer>
      <style>{`
        body { font-family: 'Inter', 'Nunito', sans-serif; }
      `}</style>
    </div>
  );
}