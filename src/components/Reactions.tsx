
import React from "react";

interface ReactionsProps {
  reactions: { [emoji: string]: number };
  onReact: (emoji: string) => void;
}

const reactionEmojis = ["👍", "🎉", "❤️", "🚀", "🙏", "🐛"];

export function Reactions({ reactions, onReact }: ReactionsProps) {
  return (
    <div className="flex gap-2 mt-2">
      {reactionEmojis.map((emoji) => (
        <button
          key={emoji}
          className={`flex items-center gap-1 px-2 py-1 rounded-full bg-gray-50 hover:bg-gray-200 transition text-sm font-medium border border-gray-200 shadow-sm active:scale-95`}
          onClick={() => onReact(emoji)}
          aria-label={`React with ${emoji}`}
          type="button"
        >
          <span>{emoji}</span>
          <span>{reactions[emoji] || 0}</span>
        </button>
      ))}
    </div>
  );
}