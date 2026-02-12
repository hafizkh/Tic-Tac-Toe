import { useRef } from "react";

const CONFETTI_COLORS = ["#fbbf24", "#a78bfa", "#34d399", "#f472b6"];
const PARTICLE_COUNT = 55;

function generateParticles(primaryColor) {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 1.2 + Math.random() * 1.5,
    size: 4 + Math.random() * 7,
    color: [primaryColor, ...CONFETTI_COLORS][Math.floor(Math.random() * 5)],
    rotation: Math.random() * 720 - 360,
    borderRadius: Math.random() > 0.5 ? "50%" : "2px",
  }));
}

export default function Confetti({ color }) {
  const particles = useRef(generateParticles(color)).current;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 20,
        borderRadius: 20,
      }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: "absolute",
            left: `${particle.x}%`,
            top: "-8%",
            width: particle.size,
            height: particle.size * 0.6,
            borderRadius: particle.borderRadius,
            background: particle.color,
            opacity: 0.85,
            animation: `confetti ${particle.duration}s ${particle.delay}s ease-in forwards`,
            transform: `rotate(${particle.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}
