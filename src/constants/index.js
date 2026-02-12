export const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const PLAYERS = {
  X: {
    color: "#E8453C",
    background: "#FEF1F0",
    backgroundAlt: "#fde8e6",
    border: "#FACBC8",
    glow: "rgba(232,69,60,.12)",
    label: "Player 1",
  },
  O: {
    color: "#2563EB",
    background: "#EFF4FF",
    backgroundAlt: "#e0ebff",
    border: "#BFCFFA",
    glow: "rgba(37,99,235,.12)",
    label: "Player 2",
  },
};

export const DIFFICULTY = {
  easy: {
    label: "Easy",
    emoji: "😊",
    description: "Random moves",
    color: "#16a34a",
    background: "#f0fdf4",
    border: "#bbf7d0",
  },
  hard: {
    label: "Hard",
    emoji: "🧠",
    description: "Smart sometimes",
    color: "#ea580c",
    background: "#fff7ed",
    border: "#fed7aa",
  },
  impossible: {
    label: "Impossible",
    emoji: "🤖",
    description: "Unbeatable AI",
    color: "#dc2626",
    background: "#fef2f2",
    border: "#fecaca",
  },
};

export const GAME_PHASES = {
  MODE: "mode",
  DIFFICULTY: "diff",
  PICK: "pick",
  PLAY: "play",
};

export const GAME_MODES = {
  SINGLE_PLAYER: "1p",
  TWO_PLAYER: "2p",
};
