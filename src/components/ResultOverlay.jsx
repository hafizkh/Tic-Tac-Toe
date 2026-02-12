import Confetti from "./Confetti";
import Mark from "./Mark";
import { PLAYERS, GAME_MODES } from "../constants";

export default function ResultOverlay({
  result,
  onPlayAgain,
  gameMode,
  humanMark,
  streak,
}) {
  const isDraw = result.winner === "draw";
  const winnerConfig = !isDraw ? PLAYERS[result.winner] : null;
  const isSinglePlayer = gameMode === GAME_MODES.SINGLE_PLAYER;

  const getTitle = () => {
    if (isDraw) return "It's a Draw!";
    if (isSinglePlayer) {
      return result.winner === humanMark ? "You Win! 🎉" : "Computer Wins";
    }
    return `${winnerConfig.label} Wins!`;
  };

  const getSubtitle = () => {
    if (isDraw) return "Evenly matched!";
    if (isSinglePlayer) {
      return result.winner === humanMark ? "Amazing play!" : "Try again!";
    }
    return "Well played!";
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: 20,
        background: "rgba(255,255,255,.94)",
        backdropFilter: "blur(10px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadeIn .35s ease",
        zIndex: 5,
      }}
    >
      {!isDraw && <Confetti color={winnerConfig.color} />}

      {/* Winner icon */}
      {!isDraw ? (
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: winnerConfig.background,
            border: `3px solid ${winnerConfig.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "pop .5s cubic-bezier(.34,1.56,.64,1)",
            boxShadow: `0 6px 20px ${winnerConfig.color}18`,
            position: "relative",
            zIndex: 21,
          }}
        >
          <Mark player={result.winner} size={36} />
        </div>
      ) : (
        <div style={{ fontSize: 44, animation: "pop .5s cubic-bezier(.34,1.56,.64,1)" }}>
          🤝
        </div>
      )}

      {/* Title */}
      <p
        style={{
          fontSize: 21,
          fontWeight: 800,
          marginTop: 14,
          color: isDraw ? "#777" : winnerConfig.color,
          animation: "slideUp .35s .1s both",
          position: "relative",
          zIndex: 21,
        }}
      >
        {getTitle()}
      </p>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 13,
          color: "#aaa",
          marginTop: 2,
          animation: "slideUp .35s .18s both",
          position: "relative",
          zIndex: 21,
        }}
      >
        {getSubtitle()}
      </p>

      {/* Streak badge */}
      {!isDraw && streak > 1 && (
        <div
          style={{
            marginTop: 8,
            fontSize: 12,
            fontWeight: 700,
            color: winnerConfig.color,
            background: winnerConfig.background,
            padding: "4px 12px",
            borderRadius: 8,
            border: `1px solid ${winnerConfig.border}`,
            animation: "slideUp .35s .24s both",
            position: "relative",
            zIndex: 21,
          }}
        >
          🔥 {streak} win streak!
        </div>
      )}

      {/* Play Again button */}
      <button
        onClick={onPlayAgain}
        style={{
          marginTop: 16,
          background: isDraw ? "#f5f5f5" : winnerConfig.background,
          border: `2px solid ${isDraw ? "#e5e5e5" : winnerConfig.border}`,
          color: isDraw ? "#777" : winnerConfig.color,
          padding: "10px 28px",
          borderRadius: 12,
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
          transition: "all .2s",
          animation: "slideUp .35s .3s both",
          position: "relative",
          zIndex: 21,
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "translateY(-1px)";
          e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,.08)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "none";
          e.target.style.boxShadow = "none";
        }}
      >
        Play Again
      </button>
    </div>
  );
}
