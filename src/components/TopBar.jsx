import Timer from "./Timer";
import { DIFFICULTY, GAME_MODES } from "../constants";

export default function TopBar({
  gameMode,
  difficulty,
  isGameActive,
  result,
  canUndo,
  onMenuClick,
  onUndoClick,
}) {
  const isSinglePlayer = gameMode === GAME_MODES.SINGLE_PLAYER;
  const diffConfig = difficulty ? DIFFICULTY[difficulty] : null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
        animation: "fadeIn .3s ease",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {/* Menu button */}
      <button
        onClick={onMenuClick}
        style={{
          background: "#fff",
          border: "1px solid #e5e5e5",
          borderRadius: 9,
          padding: "5px 11px",
          fontSize: 12,
          fontWeight: 600,
          color: "#aaa",
          cursor: "pointer",
          transition: "all .2s",
        }}
        onMouseEnter={(e) => {
          e.target.style.color = "#666";
          e.target.style.borderColor = "#ccc";
        }}
        onMouseLeave={(e) => {
          e.target.style.color = "#aaa";
          e.target.style.borderColor = "#e5e5e5";
        }}
      >
        ← Menu
      </button>

      {/* Difficulty badge (single player only) */}
      {isSinglePlayer && diffConfig && (
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: diffConfig.color,
            background: diffConfig.background,
            border: `1px solid ${diffConfig.border}`,
            padding: "5px 11px",
            borderRadius: 9,
          }}
        >
          {diffConfig.emoji} {diffConfig.label}
        </span>
      )}

      {/* Two player badge */}
      {!isSinglePlayer && (
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#888",
            background: "#fff",
            border: "1px solid #e5e5e5",
            padding: "5px 11px",
            borderRadius: 9,
          }}
        >
          👥 Local
        </span>
      )}

      {/* Timer */}
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "#bbb",
          background: "#fff",
          border: "1px solid #e5e5e5",
          padding: "5px 11px",
          borderRadius: 9,
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        ⏱ <Timer isRunning={isGameActive && !result} />
      </div>

      {/* Undo button */}
      {canUndo && (
        <button
          onClick={onUndoClick}
          style={{
            background: "#fff",
            border: "1px solid #e5e5e5",
            borderRadius: 9,
            padding: "5px 11px",
            fontSize: 12,
            fontWeight: 600,
            color: "#aaa",
            cursor: "pointer",
            transition: "all .2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#e8453c";
            e.target.style.borderColor = "#facbc8";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#aaa";
            e.target.style.borderColor = "#e5e5e5";
          }}
        >
          ↩ Undo
        </button>
      )}
    </div>
  );
}
