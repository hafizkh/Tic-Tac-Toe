import { PLAYERS } from "../constants";

function XMark({ size = 32, animated = true, dimmed = false }) {
  const color = dimmed ? "#d4d4d4" : PLAYERS.X.color;

  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <line
        x1="8"
        y1="8"
        x2="24"
        y2="24"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        style={{
          strokeDasharray: 23,
          strokeDashoffset: animated ? 0 : 23,
          transition: "stroke-dashoffset .3s ease, stroke .3s",
        }}
      />
      <line
        x1="24"
        y1="8"
        x2="8"
        y2="24"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        style={{
          strokeDasharray: 23,
          strokeDashoffset: animated ? 0 : 23,
          transition: "stroke-dashoffset .3s ease .08s, stroke .3s",
        }}
      />
    </svg>
  );
}

function OMark({ size = 32, animated = true, dimmed = false }) {
  const color = dimmed ? "#d4d4d4" : PLAYERS.O.color;

  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <circle
        cx="16"
        cy="16"
        r="9.5"
        fill="none"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        style={{
          strokeDasharray: 60,
          strokeDashoffset: animated ? 0 : 60,
          transition: "stroke-dashoffset .35s ease, stroke .3s",
        }}
      />
    </svg>
  );
}

export default function Mark({ player, size = 32, animated = true, dimmed = false }) {
  if (player === "X") {
    return <XMark size={size} animated={animated} dimmed={dimmed} />;
  }
  return <OMark size={size} animated={animated} dimmed={dimmed} />;
}
