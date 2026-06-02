import { useEffect } from "react";
import { useGameStore } from "../app/store/gameStore";

export function useAutoClick() {
  const addPoints = useGameStore((state) => state.addPoints);
  const pointsPerSecond = useGameStore((state) => state.pointsPerSecond);

  useEffect(() => {
    if (pointsPerSecond <= 0) return;

    const interval = setInterval(() => {
      addPoints(pointsPerSecond);
    }, 1000);

    return () => clearInterval(interval);
  }, [pointsPerSecond, addPoints]);
}