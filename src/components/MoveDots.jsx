import { PLAYERS } from "../constants";

export default function MoveDots({ moves }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 3,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 12,
      }}
    >
      {moves.map((player, index) => (
        <div
          key={index}
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: PLAYERS[player]?.color || "#ddd",
            opacity: 0.6,
            animation: "pop .2s ease",
          }}
        />
      ))}
    </div>
  );
}
