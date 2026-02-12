import { WINNING_LINES } from "../constants";

export function checkWinner(board) {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }

  if (board.every(Boolean)) {
    return { winner: "draw", line: [] };
  }

  return null;
}

export function getEmptySlots(board) {
  return board
    .map((value, index) => (value ? null : index))
    .filter((index) => index !== null);
}

function minimax(board, isMaximizing, aiMark, humanMark) {
  const result = checkWinner(board);

  if (result) {
    if (result.winner === aiMark) return 10;
    if (result.winner === humanMark) return -10;
    return 0;
  }

  const emptySlots = getEmptySlots(board);

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const index of emptySlots) {
      board[index] = aiMark;
      bestScore = Math.max(bestScore, minimax(board, false, aiMark, humanMark));
      board[index] = null;
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const index of emptySlots) {
      board[index] = humanMark;
      bestScore = Math.min(bestScore, minimax(board, true, aiMark, humanMark));
      board[index] = null;
    }
    return bestScore;
  }
}

function findBestMove(board, aiMark, humanMark) {
  let bestScore = -Infinity;
  let bestMove = -1;

  for (const index of getEmptySlots(board)) {
    board[index] = aiMark;
    const score = minimax(board, false, aiMark, humanMark);
    board[index] = null;

    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  }

  return bestMove;
}

function getRandomMove(board) {
  const emptySlots = getEmptySlots(board);
  if (!emptySlots.length) return -1;
  return emptySlots[Math.floor(Math.random() * emptySlots.length)];
}

export function getAIMove(board, difficulty, aiMark, humanMark) {
  const emptySlots = getEmptySlots(board);
  if (!emptySlots.length) return -1;

  switch (difficulty) {
    case "easy":
      return getRandomMove(board);

    case "hard":
      return Math.random() < 0.6
        ? findBestMove([...board], aiMark, humanMark)
        : getRandomMove(board);

    case "impossible":
    default:
      return findBestMove([...board], aiMark, humanMark);
  }
}

export function getAIDelay(difficulty) {
  switch (difficulty) {
    case "easy":
      return 400;
    case "hard":
      return 600;
    default:
      return 700;
  }
}
