import { DIFFICULTY, GAME_PHASES, GAME_MODES } from "../constants";

export default function GameHeader({ phase, totalGames, gameMode, difficulty }) {
  return (
    <div style={{ textAlign: "center", marginBottom: phase === GAME_PHASES.PLAY ? 10 : 20 }}>
      <h1
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: "#1a1a2e",
          letterSpacing: -0.5,
          marginBottom: 2,
        }}
      >
        Tic Tac Toe
      </h1>
      {phase === GAME_PHASES.PLAY && totalGames > 0 && (
        <p style={{ fontSize: 11, color: "#bbb", fontWeight: 500 }}>
          Game {totalGames + 1}
          {gameMode === GAME_MODES.SINGLE_PLAYER && difficulty
            ? ` · ${DIFFICULTY[difficulty].label}`
            : ""}
        </p>
      )}
    </div>
  );
}
