import Cell from "./Cell";

export default function GameBoard({
  board,
  animatedCells,
  result,
  lastMove,
  currentPlayer,
  disabled,
  onCellClick,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        width: 318,
        height: 318,
        background: "#fff",
        borderRadius: 20,
        border: "2px solid #e8e8e8",
        boxShadow: "0 4px 24px rgba(0,0,0,.05), 0 1px 3px rgba(0,0,0,.03)",
        padding: 4,
        overflow: "hidden",
        opacity: disabled ? 0.9 : 1,
        transition: "opacity .3s",
      }}
    >
      {board.map((value, index) => (
        <Cell
          key={index}
          value={value}
          index={index}
          isAnimated={animatedCells.has(index)}
          isWinning={result?.line?.includes(index)}
          isLastMove={index === lastMove}
          disabled={!!result || disabled}
          currentPlayer={!result && !disabled ? currentPlayer : null}
          onClick={() => onCellClick(index)}
        />
      ))}
    </div>
  );
}
