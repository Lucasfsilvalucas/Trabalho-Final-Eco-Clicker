import { useNavigate } from "react-router";
import { ArrowLeft, Zap, Wind } from "lucide-react";
import { useGameStore } from "../store/gameStore";

type UpgradeType = "click_bonus" | "auto_bonus";

interface UpgradeItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  value: number;
  type: UpgradeType;
}

export function UpgradesScreen() {
  const navigate = useNavigate();

  const userId = useGameStore((state) => state.userId);
  const points = useGameStore((state) => state.points);
  const spendPoints = useGameStore((state) => state.spendPoints);
  const applyClickUpgrade = useGameStore((state) => state.applyClickUpgrade);
  const applyAutoUpgrade = useGameStore((state) => state.applyAutoUpgrade);

  const upgrades: UpgradeItem[] = [
    {
      id: "solar",
      name: "Painel Solar",
      description: "Aumenta a geração por clique.",
      cost: 100,
      value: 1,
      type: "click_bonus",
    },
    {
      id: "wind",
      name: "Turbina Eólica",
      description: "Gera EcoPontos automaticamente por segundo.",
      cost: 250,
      value: 2,
      type: "auto_bonus",
    },
    {
      id: "battery",
      name: "Bateria Sustentável",
      description: "Aumenta a geração automática.",
      cost: 500,
      value: 5,
      type: "auto_bonus",
    },
  ];

  const handlePurchase = (upgrade: UpgradeItem) => {
    if (!userId || points < upgrade.cost) return;

    spendPoints(upgrade.cost);

    if (upgrade.type === "click_bonus") {
      applyClickUpgrade(upgrade.value);
    } else {
      applyAutoUpgrade(upgrade.value);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] p-6 text-white">
      <button
        onClick={() => navigate("/jogo")}
        className="flex items-center gap-2 text-[#10f5a7] mb-6"
      >
        <ArrowLeft />
        Voltar
      </button>

      <h1 className="text-2xl font-bold mb-2">Loja de Upgrades</h1>

      <p className="text-[#8b92a0] mb-2">
        Use EcoPontos para melhorar sua produção de energia.
      </p>

      <p className="text-[#10f5a7] font-bold mb-6">
        Seus EcoPontos: {points.toLocaleString()}
      </p>

      <div className="space-y-4">
        {upgrades.map((upgrade) => {
          const canBuy = points >= upgrade.cost;

          return (
            <div
              key={upgrade.id}
              className="rounded-2xl border border-[rgba(16,245,167,0.25)] bg-[rgba(15,25,35,0.7)] p-5"
            >
              <div className="flex items-start gap-4">
                <div className="text-[#10f5a7]">
                  {upgrade.type === "click_bonus" ? <Zap /> : <Wind />}
                </div>

                <div className="flex-1">
                  <h2 className="font-bold text-lg">{upgrade.name}</h2>

                  <p className="text-sm text-[#8b92a0]">
                    {upgrade.description}
                  </p>

                  <p className="text-sm mt-2 text-[#00d9ff]">
                    Bônus: +{upgrade.value}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handlePurchase(upgrade)}
                disabled={!canBuy}
                className={`w-full mt-4 rounded-lg py-3 font-bold ${
                  canBuy
                    ? "bg-gradient-to-r from-[#10f5a7] to-[#00d9ff] text-[#0a0e1a]"
                    : "bg-gray-700 text-gray-400"
                }`}
              >
                Comprar por {upgrade.cost.toLocaleString()} EcoPontos
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}