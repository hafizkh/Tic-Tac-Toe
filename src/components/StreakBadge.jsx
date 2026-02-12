import { PLAYERS } from "../constants";

export default function StreakBadge({ streak, lastWinner }) {
  if (streak < 2) return null;

  const config = PLAYERS[lastWinner];

  return (
    <div style={{ textAlign: "center", marginTop: 6 }}>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: config?.color || "#888",
          background: config?.background || "#f5f5f5",
          padding: "3px 10px",
          borderRadius: 6,
          border: `1px solid ${config?.border || "#eee"}`,
        }}
      >
        🔥 {streak} win streak
      </span>
    </div>
  );
}
