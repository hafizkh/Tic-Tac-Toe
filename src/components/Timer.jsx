import { useState, useEffect, useRef } from "react";

export default function Timer({ isRunning }) {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);

      return () => clearInterval(intervalRef.current);
    } else {
      clearInterval(intervalRef.current);
    }
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) {
      setSeconds(0);
    }
  }, [isRunning]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <span style={{ fontVariantNumeric: "tabular-nums" }}>
      {minutes}:{secs < 10 ? "0" : ""}
      {secs}
    </span>
  );
}
