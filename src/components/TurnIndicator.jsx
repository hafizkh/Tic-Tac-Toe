import { PLAYERS, GAME_MODES } from "../constants";

export default function TurnIndicator({ currentPlayer, isAITurn, gameMode, humanMark }) {
  const config = PLAYERS[currentPlayer];

  const getTurnLabel = () => {
    if (gameMode === GAME_MODES.SINGLE_PLAYER) {
      return currentPlayer === humanMark ? "Your turn" : "Computer thinking...";
    }
    return `${config.label}'s turn`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: 8, animation: "slideUp .2s ease" }}>
      <span
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: config.color,
          animation: isAITurn ? "think 1s ease-in-out infinite" : "none",
        }}
      >
        {getTurnLabel()}
      </span>
    </div>
  );
}
