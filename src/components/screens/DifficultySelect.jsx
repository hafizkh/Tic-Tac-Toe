import { useState } from "react";
import { DIFFICULTY } from "../../constants";

export default function DifficultySelect({ onSelect, onBack }) {
  const [hoveredDiff, setHoveredDiff] = useState(null);

  return (
    <div style={{ textAlign: "center", animation: "slideUp .4s cubic-bezier(.16,1,.3,1)" }}>
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "#bbb",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 4,
          margin: "0 auto 18px",
        }}
      >
        ← Back
      </button>

      <p style={{ fontSize: 15, fontWeight: 600, color: "#999", marginBottom: 24 }}>
        Select difficulty
      </p>

      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        {Object.entries(DIFFICULTY).map(([key, diff]) => {
          const isHovered = hoveredDiff === key;

          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              onMouseEnter={() => setHoveredDiff(key)}
              onMouseLeave={() => setHoveredDiff(null)}
              style={{
                width: 140,
                padding: "22px 12px",
                background: isHovered ? diff.background : "#fff",
                border: `2px solid ${isHovered ? diff.color + "50" : "#eaeaea"}`,
                borderRadius: 18,
                cursor: "pointer",
                outline: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                transition: "all .25s ease",
                transform: isHovered ? "translateY(-2px)" : "none",
                boxShadow: isHovered
                  ? `0 6px 20px ${diff.color}12`
                  : "0 1px 6px rgba(0,0,0,.03)",
              }}
            >
              <span style={{ fontSize: 30 }}>{diff.emoji}</span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: isHovered ? diff.color : "#444",
                }}
              >
                {diff.label}
              </span>
              <span style={{ fontSize: 11, color: "#aaa" }}>{diff.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
