import "./styles/index.css";
import { useGame } from "./hooks";
import { GAME_PHASES } from "./constants";
import {
  ModeSelect,
  DifficultySelect,
  PlayerSelect,
  GameBoard,
  ScoreBar,
  TopBar,
  MoveDots,
  ResultOverlay,
  TurnIndicator,
  StreakBadge,
  GameHeader,
} from "./components";

export default function App() {
  const {
    board,
    currentPlayer,
    result,
    animatedCells,
    scores,
    showResult,
    phase,
    gameMode,
    difficulty,
    humanMark,
    history,
    lastMove,
    streak,
    lastWinner,
    isGameActive,
    isAITurn,
    canUndo,
    totalGames,
    selectMode,
    selectDifficulty,
    startGame,
    play,
    undo,
    reset,
    goToMenu,
    goBack,
  } = useGame();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(170deg, #fafbfc 0%, #f1f3f6 40%, #eef0f5 100%)",
        fontFamily: "'DM Sans', sans-serif",
        padding: 20,
      }}
    >
      <GameHeader
        phase={phase}
        totalGames={totalGames}
        gameMode={gameMode}
        difficulty={difficulty}
      />

      {phase === GAME_PHASES.MODE && <ModeSelect onSelect={selectMode} />}

      {phase === GAME_PHASES.DIFFICULTY && (
        <DifficultySelect onSelect={selectDifficulty} onBack={goBack} />
      )}

      {phase === GAME_PHASES.PICK && (
        <PlayerSelect
          onSelect={startGame}
          onBack={goBack}
          gameMode={gameMode}
          scores={scores}
        />
      )}

      {phase === GAME_PHASES.PLAY && (
        <div style={{ animation: "slideUp .4s cubic-bezier(.16,1,.3,1)" }}>
          <TopBar
            gameMode={gameMode}
            difficulty={difficulty}
            isGameActive={isGameActive}
            result={result}
            canUndo={canUndo}
            onMenuClick={goToMenu}
            onUndoClick={undo}
          />

          <ScoreBar
            scores={scores}
            currentPlayer={currentPlayer}
            result={result}
            gameMode={gameMode}
            humanMark={humanMark}
          />

          <div style={{ position: "relative" }}>
            <GameBoard
              board={board}
              animatedCells={animatedCells}
              result={result}
              lastMove={lastMove}
              currentPlayer={currentPlayer}
              disabled={isAITurn}
              onCellClick={play}
            />

            {showResult && result && (
              <ResultOverlay
                result={result}
                onPlayAgain={reset}
                gameMode={gameMode}
                humanMark={humanMark}
                streak={streak}
              />
            )}
          </div>

          <div style={{ marginTop: 10 }}>
            <MoveDots moves={history.map((h) => h.mark)} />
          </div>

          {!result && currentPlayer && (
            <TurnIndicator
              currentPlayer={currentPlayer}
              isAITurn={isAITurn}
              gameMode={gameMode}
              humanMark={humanMark}
            />
          )}

          {!result && <StreakBadge streak={streak} lastWinner={lastWinner} />}
        </div>
      )}
    </div>
  );
}
