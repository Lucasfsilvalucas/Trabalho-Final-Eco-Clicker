import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Trophy, Zap } from "lucide-react";
import { useGameStore } from "../store/gameStore";
import { getRanking, RankingPlayer } from "../services/ranking";

export function RankingScreen() {
  const navigate = useNavigate();

  const username = useGameStore((state) => state.username);
  const points = useGameStore((state) => state.points);

  const [players, setPlayers] = useState<RankingPlayer[]>([]);

  useEffect(() => {
    async function loadRanking() {
      const ranking = await getRanking();
      setPlayers(ranking);
    }

    loadRanking();
  }, []);

  const list =
    players.length > 0
      ? players
      : [
          {
            position: 1,
            playerName: username,
            totalPoints: points,
          },
        ];

  const getMedalColor = (position: number) => {
    switch (position) {
      case 1:
        return "#FFD700";
      case 2:
        return "#C0C0C0";
      case 3:
        return "#CD7F32";
      default:
        return "#10f5a7";
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0e1a] overflow-y-auto text-white">
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-[rgba(10,14,26,0.9)] border-b border-[rgba(16,245,167,0.2)]">
        <div className="p-6">
          <button
            onClick={() => navigate("/jogo")}
            className="flex items-center gap-2 text-[#10f5a7] mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>

          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#10f5a7] to-[#00d9ff]">
              <Trophy className="w-7 h-7 text-white" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#10f5a7]">
                Ranking Global
              </h1>

              <p className="text-sm text-[#8b92a0] mt-1">
                Maiores geradores de energia limpa
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-3">
        {list.map((player, index) => {
          const position = player.position ?? index + 1;
          const isCurrentUser = player.playerName === username;

          return (
            <div
              key={`${player.playerName}-${position}`}
              className={`backdrop-blur-xl border rounded-2xl p-4 ${
                isCurrentUser
                  ? "border-[#10f5a7]"
                  : "border-[rgba(16,245,167,0.2)]"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 flex items-center justify-center rounded-xl border-2"
                  style={{ borderColor: getMedalColor(position) }}
                >
                  <div style={{ color: getMedalColor(position) }}>
                    #{position}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-bold">{player.playerName}</h3>

                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#00d9ff]" />

                    <span className="font-mono">
                      {(player.totalPoints ?? 0).toLocaleString()}
                    </span>
                  </div>
                </div>

                {isCurrentUser && (
                  <span className="text-xs text-[#10f5a7]">Você</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}