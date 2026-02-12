import { useState } from "react";
import Mark from "./Mark";
import { PLAYERS } from "../constants";

export default function Cell({
  value,
  index,
  isAnimated,
  isWinning,
  isLastMove,
  disabled,
  currentPlayer,
  onClick,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const row = Math.floor(index / 3);
  const col = index % 3;
  const canPlay = !disabled && !value;

  const getBackground = () => {
    if (isWinning) return PLAYERS[value]?.backgroundAlt || "#fff";
    if (isLastMove && value) return "#fafafa";
    if (isHovered && canPlay) return "#f8f8f8";
    return "#fff";
  };

  return (
    <button
      onClick={canPlay ? onClick : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1",
        background: getBackground(),
        border: "none",
        outline: "none",
        borderRight: col < 2 ? "2px solid #ebebeb" : "none",
        borderBottom: row < 2 ? "2px solid #ebebeb" : "none",
        cursor: canPlay ? "pointer" : "default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background .2s",
      }}
    >
      {/* Hover preview */}
      {isHovered && canPlay && currentPlayer && (
        <div style={{ position: "absolute", opacity: 0.13, animation: "pop .12s ease" }}>
          <Mark player={currentPlayer} size={30} />
        </div>
      )}

      {/* Placed mark */}
      {value && (
        <div
          style={{
            animation: isAnimated ? "pop .3s cubic-bezier(.34,1.56,.64,1)" : "none",
          }}
        >
          <Mark player={value} size={36} animated={isAnimated} />
        </div>
      )}

      {/* Win highlight */}
      {isWinning && (
        <div
          style={{
            position: "absolute",
            inset: 5,
            borderRadius: 13,
            border: `2px solid ${PLAYERS[value]?.color}28`,
            animation: "fadeIn .4s",
          }}
        />
      )}

      {/* Last move indicator */}
      {isLastMove && value && !isWinning && (
        <div
          style={{
            position: "absolute",
            bottom: 6,
            left: "50%",
            transform: "translateX(-50%)",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: PLAYERS[value]?.color + "50",
          }}
        />
      )}
    </button>
  );
}
