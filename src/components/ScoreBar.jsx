import Mark from "./Mark";
import { PLAYERS, GAME_MODES } from "../constants";

export default function ScoreBar({ scores, currentPlayer, result, gameMode, humanMark }) {
  const isSinglePlayer = gameMode === GAME_MODES.SINGLE_PLAYER;

  const getLabel = (player) => {
    if (isSinglePlayer) {
      return player === humanMark ? "You" : "CPU";
    }
    return PLAYERS[player].label;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginBottom: 14,
      }}
    >
      {["X", "O"].map((player) => {
        const isActive = currentPlayer === player && !result;
        const config = PLAYERS[player];

        return (
          <div
            key={player}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "6px 13px",
              borderRadius: 12,
              background: isActive ? config.background : "#fff",
              border: `2px solid ${isActive ? config.color + "40" : "#eee"}`,
              transition: "all .3s ease",
              boxShadow: isActive
                ? `0 2px 12px ${config.color}10`
                : "0 1px 3px rgba(0,0,0,.02)",
            }}
          >
            <Mark player={player} size={16} dimmed={!isActive} />
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: isActive ? config.color : "#aaa",
                transition: "color .3s",
                minWidth: 22,
              }}
            >
              {getLabel(player)}
            </span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#333",
                minWidth: 12,
                textAlign: "center",
              }}
            >
              {scores[player]}
            </span>
            {isActive && (
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: config.color,
                  animation: "pulse 1.2s ease-in-out infinite",
                  boxShadow: `0 0 4px ${config.color}80`,
                }}
              />
            )}
          </div>
        );
      })}

      {scores.draw > 0 && (
        <div
          style={{
            fontSize: 12,
            color: "#bbb",
            padding: "6px 10px",
            background: "#fff",
            borderRadius: 12,
            border: "2px solid #eee",
          }}
        >
          <span style={{ fontWeight: 700, color: "#999" }}>{scores.draw}</span> draw
          {scores.draw !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}
