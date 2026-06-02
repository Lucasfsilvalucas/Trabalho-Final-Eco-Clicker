import { useGameStore } from "../store/gameStore";

export function ClickArea() {
  const addPoints = useGameStore((state) => state.addPoints);
  const pointsPerClick = useGameStore((state) => state.pointsPerClick);

  const handleClick = () => {
    addPoints(pointsPerClick);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full h-full flex items-center justify-center cursor-pointer select-none"
    >
      <div className="text-white text-2xl">
        🌱 Clique para gerar energia
      </div>
    </div>
  );
}