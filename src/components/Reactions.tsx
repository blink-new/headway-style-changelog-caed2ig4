
import React, { useRef, useState } from "react";

interface ReactionsProps {
  reactions: { [emoji: string]: number };
  onReact: (emoji: string) => void;
}

const reactionEmojis = ["👍", "🎉", "❤️", "🚀", "🙏", "🐛"];

function randomConfettiColors() {
  // Pastel palette
  const colors = [
    "#a5b4fc", "#f9a8d4", "#fcd34d", "#6ee7b7", "#fca5a5", "#fbbf24", "#f472b6", "#c4b5fd"
  ];
  return Array.from({ length: 8 }, () => colors[Math.floor(Math.random() * colors.length)]);
}

export function Reactions({ reactions, onReact }: ReactionsProps) {
  const [animating, setAnimating] = useState<{ [emoji: string]: boolean }>({});
  const [confetti, setConfetti] = useState<{ emoji: string; key: number } | null>(null);
  const confettiColors = useRef(randomConfettiColors());

  function handleReact(emoji: string) {
    setAnimating((prev) => ({ ...prev, [emoji]: true }));
    onReact(emoji);
    // Only show confetti if it's the first reaction for this emoji
    if ((reactions[emoji] || 0) === 0) {
      setConfetti({ emoji, key: Date.now() });
      confettiColors.current = randomConfettiColors();
      setTimeout(() => setConfetti(null), 700);
    }
    setTimeout(() => setAnimating((prev) => ({ ...prev, [emoji]: false })), 350);
  }

  return (
    <div className="relative flex gap-2 mt-2">
      {reactionEmojis.map((emoji) => (
        <button
          key={emoji}
          className={`flex items-center gap-1 px-2 py-1 rounded-full bg-gray-50 hover:bg-indigo-100 transition text-sm font-medium border border-gray-200 shadow-sm active:scale-95
            ${animating[emoji] ? "scale-125 ring-2 ring-indigo-200" : ""}
          `}
          onClick={() => handleReact(emoji)}
          aria-label={`React with ${emoji}`}
          type="button"
          style={{ transition: "transform 0.18s cubic-bezier(.62,1.53,.53,.97)" }}
        >
          <span>{emoji}</span>
          <span>{reactions[emoji] || 0}</span>
        </button>
      ))}
      {confetti && (
        <span className="confetti fade-in" key={confetti.key}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: confettiColors.current[i],
                margin: "0 2px",
                transform: `translateY(${Math.random() * 20 - 10}px) scale(${0.8 + Math.random() * 0.7}) rotate(${Math.random() * 360}deg)`,
                opacity: 0.85,
              }}
            />
          ))}
        </span>
      )}
    </div>
  );
}