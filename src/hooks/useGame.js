import { useState, useCallback, useEffect, useRef } from "react";
import { checkWinner, getAIMove, getAIDelay } from "../utils/gameLogic";
import { GAME_PHASES, GAME_MODES } from "../constants";

const INITIAL_SCORES = { X: 0, O: 0, draw: 0 };

export default function useGame() {
  // Game state
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [result, setResult] = useState(null);
  const [animatedCells, setAnimatedCells] = useState(new Set());
  const [scores, setScores] = useState(INITIAL_SCORES);
  const [showResult, setShowResult] = useState(false);

  // Game configuration
  const [phase, setPhase] = useState(GAME_PHASES.MODE);
  const [gameMode, setGameMode] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [humanMark, setHumanMark] = useState(null);

  // Move history
  const [history, setHistory] = useState([]);
  const [lastMove, setLastMove] = useState(-1);

  // Streak tracking
  const [streak, setStreak] = useState(0);
  const [lastWinner, setLastWinner] = useState(null);

  // Game active state
  const [isGameActive, setIsGameActive] = useState(false);

  // AI timer ref
  const aiTimerRef = useRef(null);

  const aiMark = humanMark === "X" ? "O" : "X";
  const isSinglePlayer = gameMode === GAME_MODES.SINGLE_PLAYER;
  const isAITurn = isSinglePlayer && currentPlayer === aiMark && !result;

  // Handle result
  const handleResult = useCallback(
    (gameResult) => {
      setResult(gameResult);

      const scoreKey = gameResult.winner === "draw" ? "draw" : gameResult.winner;
      setScores((prev) => ({ ...prev, [scoreKey]: prev[scoreKey] + 1 }));

      if (gameResult.winner !== "draw") {
        if (gameResult.winner === lastWinner) {
          setStreak((prev) => prev + 1);
        } else {
          setStreak(1);
          setLastWinner(gameResult.winner);
        }
      } else {
        setStreak(0);
        setLastWinner(null);
      }

      setTimeout(() => setShowResult(true), 500);
      setIsGameActive(false);
    },
    [lastWinner]
  );

  // AI move effect
  useEffect(() => {
    if (!isSinglePlayer || result || phase !== GAME_PHASES.PLAY) return;
    if (currentPlayer !== aiMark) return;

    const delay = getAIDelay(difficulty);

    aiTimerRef.current = setTimeout(() => {
      setBoard((prevBoard) => {
        const move = getAIMove([...prevBoard], difficulty, aiMark, humanMark);
        if (move === -1) return prevBoard;

        const newBoard = [...prevBoard];
        newBoard[move] = aiMark;

        setAnimatedCells((prev) => new Set([...prev, move]));
        setHistory((prev) => [...prev, { cell: move, mark: aiMark }]);
        setLastMove(move);

        const gameResult = checkWinner(newBoard);
        if (gameResult) {
          handleResult(gameResult);
        } else {
          setCurrentPlayer(humanMark);
        }

        return newBoard;
      });
    }, delay);

    return () => clearTimeout(aiTimerRef.current);
  }, [
    currentPlayer,
    isSinglePlayer,
    result,
    phase,
    aiMark,
    humanMark,
    difficulty,
    handleResult,
  ]);

  // Mode selection
  const selectMode = useCallback((mode) => {
    setGameMode(mode);
    setPhase(mode === GAME_MODES.SINGLE_PLAYER ? GAME_PHASES.DIFFICULTY : GAME_PHASES.PICK);
  }, []);

  // Difficulty selection
  const selectDifficulty = useCallback((diff) => {
    setDifficulty(diff);
    setPhase(GAME_PHASES.PICK);
  }, []);

  // Start game
  const startGame = useCallback(
    (firstPlayer) => {
      if (isSinglePlayer) {
        setHumanMark(firstPlayer);
      }
      setCurrentPlayer(firstPlayer);
      setBoard(Array(9).fill(null));
      setResult(null);
      setAnimatedCells(new Set());
      setShowResult(false);
      setHistory([]);
      setLastMove(-1);
      setIsGameActive(true);
      setPhase(GAME_PHASES.PLAY);
    },
    [isSinglePlayer]
  );

  // Make a move
  const play = useCallback(
    (index) => {
      if (board[index] || result) return;
      if (isSinglePlayer && currentPlayer !== humanMark) return;

      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setAnimatedCells((prev) => new Set([...prev, index]));
      setHistory((prev) => [...prev, { cell: index, mark: currentPlayer }]);
      setLastMove(index);

      const gameResult = checkWinner(newBoard);
      if (gameResult) {
        handleResult(gameResult);
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    },
    [board, currentPlayer, result, isSinglePlayer, humanMark, handleResult]
  );

  // Undo move
  const undo = useCallback(() => {
    if (history.length === 0 || result) return;

    // In single player, undo both AI and player moves
    let stepsToUndo =
      isSinglePlayer && history.length >= 2 && history[history.length - 1].mark === aiMark
        ? 2
        : 1;

    const newBoard = [...board];
    const newHistory = [...history];

    for (let i = 0; i < stepsToUndo && newHistory.length > 0; i++) {
      const lastMoveData = newHistory.pop();
      newBoard[lastMoveData.cell] = null;
      setAnimatedCells((prev) => {
        const next = new Set(prev);
        next.delete(lastMoveData.cell);
        return next;
      });
    }

    setBoard(newBoard);
    setHistory(newHistory);
    setLastMove(newHistory.length > 0 ? newHistory[newHistory.length - 1].cell : -1);

    if (isSinglePlayer) {
      setCurrentPlayer(humanMark);
    } else {
      setCurrentPlayer(
        newHistory.length > 0
          ? newHistory[newHistory.length - 1].mark === "X"
            ? "O"
            : "X"
          : history[0]?.mark || "X"
      );
    }
  }, [board, history, result, isSinglePlayer, aiMark, humanMark]);

  // Reset for new game
  const reset = useCallback(() => {
    clearTimeout(aiTimerRef.current);
    setPhase(GAME_PHASES.PICK);
    setBoard(Array(9).fill(null));
    setCurrentPlayer(null);
    setResult(null);
    setAnimatedCells(new Set());
    setShowResult(false);
    setHistory([]);
    setLastMove(-1);
    setIsGameActive(false);
  }, []);

  // Go back to main menu
  const goToMenu = useCallback(() => {
    clearTimeout(aiTimerRef.current);
    setPhase(GAME_PHASES.MODE);
    setGameMode(null);
    setDifficulty(null);
    setHumanMark(null);
    setBoard(Array(9).fill(null));
    setCurrentPlayer(null);
    setResult(null);
    setAnimatedCells(new Set());
    setShowResult(false);
    setScores(INITIAL_SCORES);
    setHistory([]);
    setLastMove(-1);
    setStreak(0);
    setLastWinner(null);
    setIsGameActive(false);
  }, []);

  // Go back in navigation
  const goBack = useCallback(() => {
    if (phase === GAME_PHASES.DIFFICULTY) {
      setPhase(GAME_PHASES.MODE);
    } else if (phase === GAME_PHASES.PICK) {
      setPhase(isSinglePlayer ? GAME_PHASES.DIFFICULTY : GAME_PHASES.MODE);
    }
  }, [phase, isSinglePlayer]);

  // Can undo check
  const canUndo = history.length > 0 && !result && !isAITurn;

  // Total games played
  const totalGames = scores.X + scores.O + scores.draw;

  return {
    // State
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

    // Actions
    selectMode,
    selectDifficulty,
    startGame,
    play,
    undo,
    reset,
    goToMenu,
    goBack,
  };
}
