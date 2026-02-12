import { useState } from "react";
import { GAME_MODES } from "../../constants";

const MODES = [
  {
    id: GAME_MODES.SINGLE_PLAYER,
    icon: "🤖",
    label: "vs Computer",
    description: "Challenge the AI",
  },
  {
    id: GAME_MODES.TWO_PLAYER,
    icon: "👥",
    label: "2 Players",
    description: "Play with a friend",
  },
];

export default function ModeSelect({ onSelect }) {
  const [hoveredMode, setHoveredMode] = useState(null);

  return (
    <div style={{ textAlign: "center", animation: "slideUp .45s cubic-bezier(.16,1,.3,1)" }}>
      <p style={{ fontSize: 15, fontWeight: 600, color: "#999", marginBottom: 28 }}>
        Choose game mode
      </p>

      <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
        {MODES.map((mode) => {
          const isHovered = hoveredMode === mode.id;

          return (
            <button
              key={mode.id}
              onClick={() => onSelect(mode.id)}
              onMouseEnter={() => setHoveredMode(mode.id)}
              onMouseLeave={() => setHoveredMode(null)}
              style={{
                width: 165,
                padding: "26px 16px",
                background: isHovered ? "#fafafa" : "#fff",
                border: `2px solid ${isHovered ? "#d1d1d1" : "#eaeaea"}`,
                borderRadius: 20,
                cursor: "pointer",
                outline: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                transition: "all .25s ease",
                transform: isHovered ? "translateY(-3px)" : "none",
                boxShadow: isHovered
                  ? "0 8px 24px rgba(0,0,0,.06)"
                  : "0 1px 6px rgba(0,0,0,.03)",
              }}
            >
              <span style={{ fontSize: 34 }}>{mode.icon}</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#333" }}>
                {mode.label}
              </span>
              <span style={{ fontSize: 12, color: "#aaa" }}>{mode.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
