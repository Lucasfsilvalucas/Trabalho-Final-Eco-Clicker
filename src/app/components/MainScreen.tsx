import { useNavigate } from "react-router";
import { Zap, TrendingUp, Award, Settings } from "lucide-react";
import { ParticleBackground } from "./ParticleBackground";
import { useGameStore } from "../store/gameStore";
import { useAutoClick } from "../../hooks/useAutoClick";
export function MainScreen() {
  const navigate = useNavigate();

  useAutoClick();

  const username = useGameStore((state) => state.username);
  const points = useGameStore((state) => state.points);
  const pointsPerClick = useGameStore((state) => state.pointsPerClick);
  const pointsPerSecond = useGameStore((state) => state.pointsPerSecond);
  const addPoints = useGameStore((state) => state.addPoints);

  const handleClick = () => {
    addPoints(pointsPerClick);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0a0e1a] overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 p-6 flex justify-between">
        <div>
          <h2 className="text-sm text-[#8b92a0]">Operador</h2>
          <h1 className="text-2xl font-bold text-white">{username}</h1>
        </div>

        <div className="text-right">
          <div className="text-xs text-[#8b92a0]">EcoPontos</div>
          <div className="text-3xl font-bold text-white">
            {points.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-4 text-center text-[#8b92a0]">
        <p>Por clique: +{pointsPerClick}</p>
        <p>Por segundo: +{pointsPerSecond}</p>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center mt-20">
        <button
          onClick={handleClick}
          className="active:scale-95 transition-transform"
        >
          <Zap className="text-[#10f5a7] w-28 h-28 drop-shadow-[0_0_10px_rgba(16,245,167,0.6)]" />
        </button>

        <p className="mt-6 text-white">Gerar Energia</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex justify-around text-white">
          <NavButton
            icon={<TrendingUp />}
            label="Upgrades"
            onClick={() => navigate("/jogo/upgrades")}
          />

          <NavButton
            icon={<Award />}
            label="Ranking"
            onClick={() => navigate("/jogo/ranking")}
          />

          <NavButton
            icon={<Settings />}
            label="Config"
            onClick={() => navigate("/jogo/config")}
          />
        </div>
      </div>
    </div>
  );
}

function NavButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center text-[#8b92a0] hover:text-[#10f5a7] transition-colors"
    >
      <div className="w-6 h-6">{icon}</div>
      <span className="text-xs">{label}</span>
    </button>
  );
}