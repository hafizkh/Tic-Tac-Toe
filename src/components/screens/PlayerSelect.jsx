import { useState } from "react";
import Mark from "../Mark";
import { PLAYERS, GAME_MODES } from "../../constants";

export default function PlayerSelect({ onSelect, onBack, gameMode, scores }) {
  const [hoveredPlayer, setHoveredPlayer] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const isSinglePlayer = gameMode === GAME_MODES.SINGLE_PLAYER;
  const hasScores = scores.X > 0 || scores.O > 0 || scores.draw > 0;

  const labels = isSinglePlayer
    ? { X: "You (X)", O: "Computer (O)" }
    : { X: "Player 1 (X)", O: "Player 2 (O)" };

  const handleSelect = (player) => {
    setSelectedPlayer(player);
    setTimeout(() => onSelect(player), 350);
  };

  const handleRandom = () => {
    if (!selectedPlayer) {
      handleSelect(Math.random() < 0.5 ? "X" : "O");
    }
  };

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
          margin: "0 auto 14px",
        }}
      >
        ← Back
      </button>

      {/* Score display */}
      {hasScores && (
        <div
          style={{
            display: "inline-flex",
            gap: 14,
            marginBottom: 22,
            padding: "7px 16px",
            background: "#fff",
            borderRadius: 12,
            border: "1px solid #eee",
            boxShadow: "0 1px 4px rgba(0,0,0,.03)",
          }}
        >
          {["X", "O"].map((player) => (
            <div key={player} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Mark player={player} size={14} />
              <span style={{ fontSize: 16, fontWeight: 700, color: "#333" }}>
                {scores[player]}
              </span>
            </div>
          ))}
          {scores.draw > 0 && (
            <span style={{ fontSize: 13, color: "#aaa" }}>Draw {scores.draw}</span>
          )}
        </div>
      )}

      <p style={{ fontSize: 15, fontWeight: 600, color: "#999", marginBottom: 22 }}>
        Who goes first?
      </p>

      {/* Player selection buttons */}
      <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
        {["X", "O"].map((player) => {
          const config = PLAYERS[player];
          const isHovered = hoveredPlayer === player;
          const isSelected = selectedPlayer === player;
          const isDimmed = selectedPlayer && selectedPlayer !== player;

          return (
            <button
              key={player}
              onClick={() => !selectedPlayer && handleSelect(player)}
              onMouseEnter={() => !selectedPlayer && setHoveredPlayer(player)}
              onMouseLeave={() => !selectedPlayer && setHoveredPlayer(null)}
              style={{
                width: 152,
                padding: "22px 0",
                background: isSelected ? config.background : "#fff",
                border: `2px solid ${
                  isSelected ? config.color : isHovered ? config.border : "#eaeaea"
                }`,
                borderRadius: 18,
                cursor: selectedPlayer ? "default" : "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                outline: "none",
                transition: "all .25s cubic-bezier(.4,0,.2,1)",
                transform: isSelected
                  ? "scale(1.04)"
                  : isDimmed
                  ? "scale(.93)"
                  : isHovered
                  ? "translateY(-2px)"
                  : "none",
                opacity: isDimmed ? 0.25 : 1,
                boxShadow: isSelected
                  ? `0 6px 20px ${config.color}18`
                  : isHovered
                  ? "0 4px 14px rgba(0,0,0,.05)"
                  : "0 1px 6px rgba(0,0,0,.03)",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: config.background,
                  border: `2px solid ${config.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Mark player={player} size={24} />
              </div>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: isSelected || isHovered ? config.color : "#888",
                }}
              >
                {labels[player]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Random button */}
      <button
        onClick={handleRandom}
        style={{
          marginTop: 18,
          background: "#fafafa",
          border: "1px solid #eaeaea",
          color: "#aaa",
          padding: "8px 18px",
          borderRadius: 10,
          fontSize: 13,
          fontWeight: 600,
          cursor: selectedPlayer ? "default" : "pointer",
          transition: "all .2s",
        }}
        onMouseEnter={(e) => {
          if (!selectedPlayer) {
            e.target.style.color = "#777";
            e.target.style.background = "#f5f5f5";
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.color = "#aaa";
          e.target.style.background = "#fafafa";
        }}
      >
        🎲 Random
      </button>
    </div>
  );
}
