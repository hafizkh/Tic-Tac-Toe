# Tic Tac Toe

A modern, responsive Tic Tac Toe game built with React and Vite. Features single-player mode with AI opponent and local two-player mode.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.0-purple)

**[Live Demo](https://tic-tac-toe-hafiz.netlify.app)**

## Features

- **Single Player Mode** - Play against AI with three difficulty levels:
  - Easy - Random moves
  - Hard - Smart sometimes (60% optimal moves)
  - Impossible - Unbeatable AI using minimax algorithm

- **Two Player Mode** - Local multiplayer for playing with friends

- **Game Features**:
  - Score tracking across games
  - Win streak counter
  - Move history visualization
  - Game timer
  - Undo functionality
  - Smooth animations and confetti on win
  - Responsive design

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tic-tac-toe
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
tic-tac-toe/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                 # Entry point
    ├── App.jsx                  # Main app component
    ├── constants/
    │   └── index.js             # Game constants & configuration
    ├── utils/
    │   └── gameLogic.js         # AI logic & win detection
    ├── hooks/
    │   └── useGame.js           # Game state management hook
    ├── styles/
    │   └── index.css            # Global styles & animations
    └── components/
        ├── Mark.jsx             # X and O SVG marks
        ├── Cell.jsx             # Board cell
        ├── GameBoard.jsx        # 3x3 game board
        ├── Timer.jsx            # Game timer
        ├── Confetti.jsx         # Win celebration effect
        ├── MoveDots.jsx         # Move history indicator
        ├── ScoreBar.jsx         # Score display
        ├── TopBar.jsx           # Menu, timer, undo buttons
        ├── TurnIndicator.jsx    # Current turn display
        ├── StreakBadge.jsx      # Win streak badge
        ├── GameHeader.jsx       # Game title header
        ├── ResultOverlay.jsx    # Win/draw result screen
        └── screens/
            ├── ModeSelect.jsx       # Game mode selection
            ├── DifficultySelect.jsx # AI difficulty selection
            └── PlayerSelect.jsx     # First player selection
```

## How to Play

1. **Select Game Mode**
   - Choose "vs Computer" for single-player
   - Choose "2 Players" for local multiplayer

2. **Select Difficulty** (Single Player only)
   - Easy: AI makes random moves
   - Hard: AI plays optimally 60% of the time
   - Impossible: AI never loses

3. **Choose Who Goes First**
   - Select X or O
   - Or click "Random" for random selection

4. **Play the Game**
   - Click on any empty cell to place your mark
   - First to get 3 in a row wins
   - Use "Undo" to take back moves
   - Use "Menu" to return to mode selection

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **CSS-in-JS** - Inline styles for components

## License

MIT License

