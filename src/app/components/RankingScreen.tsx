import { useNavigate } from 'react-router';
import { ArrowLeft, Trophy, TrendingUp, Zap } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

interface Player {
  rank: number;
  name: string;
  points: number;
  growth: number;
}

export function RankingScreen() {
  const navigate = useNavigate();
  const username = useGameStore((state) => state.username);
  const ecoPoints = useGameStore((state) => state.ecoPoints);
  const players: Player[] = [
    { rank: 1, name: 'Aurora_Verde', points: 50420, growth: 15.2 },
    { rank: 2, name: 'NeoSynthesis', points: 48900, growth: 12.8 },
    { rank: 3, name: username, points: ecoPoints, growth: 18.5 },
    { rank: 4, name: 'BioPulse_X', points: 42100, growth: 9.4 },
    { rank: 5, name: 'Ecosfera', points: 39800, growth: 11.2 },
    { rank: 6, name: 'GreenCircuit', points: 37500, growth: 7.8 },
    { rank: 7, name: 'SolarWind', points: 35200, growth: 10.1 },
    { rank: 8, name: 'TerraNode', points: 33900, growth: 6.5 }
  ];

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1: return '#FFD700';
      case 2: return '#C0C0C0';
      case 3: return '#CD7F32';
      default: return '#10f5a7';
    }
  };

  return (
    <div className="relative size-full bg-[#0a0e1a] overflow-y-auto">
      {/* Command center background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 border-l-2 border-t-2 border-[#10f5a7]"></div>
        <div className="absolute top-0 right-0 w-64 h-64 border-r-2 border-t-2 border-[#00d9ff]"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 border-l-2 border-b-2 border-[#00d9ff]"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 border-r-2 border-b-2 border-[#10f5a7]"></div>
      </div>

      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-[rgba(10,14,26,0.9)] border-b border-[rgba(16,245,167,0.2)]">
        <div className="p-6">
          <button
            onClick={() => navigate('/jogo')}
            className="flex items-center gap-2 text-[#10f5a7] hover:text-[#00d9ff] transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="tracking-wide">Voltar</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#10f5a7] to-[#00d9ff] shadow-[0_0_20px_rgba(16,245,167,0.4)]">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#10f5a7] to-[#00d9ff] bg-clip-text text-transparent">
                Líderes da Evolução
              </h1>
              <p className="text-sm text-[#8b92a0] mt-1">Top contribuidores da Rede Verde</p>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 px-6 pb-6">
          <div className="backdrop-blur-lg bg-[rgba(15,25,35,0.4)] border border-[rgba(16,245,167,0.2)] rounded-xl p-3 text-center">
            <div className="text-xs text-[#8b92a0] mb-1">Sua Posição</div>
            <div className="text-2xl font-bold text-[#10f5a7]">#3</div>
          </div>
          <div className="backdrop-blur-lg bg-[rgba(15,25,35,0.4)] border border-[rgba(16,245,167,0.2)] rounded-xl p-3 text-center">
            <div className="text-xs text-[#8b92a0] mb-1">Seus Pontos</div>
            <div className="text-2xl font-bold text-[#00d9ff]">{ecoPoints.toLocaleString()}</div>
          </div>
          <div className="backdrop-blur-lg bg-[rgba(15,25,35,0.4)] border border-[rgba(16,245,167,0.2)] rounded-xl p-3 text-center">
            <div className="text-xs text-[#8b92a0] mb-1">Crescimento</div>
            <div className="text-2xl font-bold text-[#10f5a7]">+18.5%</div>
          </div>
        </div>
      </div>

      {/* Rankings list */}
      <div className="relative z-10 p-6 space-y-3">
        {players.map((player) => {
          const isCurrentUser = player.name === username;

          return (
            <div
              key={player.rank}
              className={`group relative backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-300 ${
                isCurrentUser
                  ? 'bg-gradient-to-br from-[rgba(16,245,167,0.15)] to-[rgba(0,217,255,0.15)] border-[#10f5a7] shadow-[0_0_30px_rgba(16,245,167,0.3)]'
                  : 'bg-[rgba(15,25,35,0.4)] border-[rgba(16,245,167,0.2)] hover:border-[rgba(16,245,167,0.4)]'
              }`}
            >
              {/* Radar scan effect for current user */}
              {isCurrentUser && (
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#10f5a7]/20 to-transparent animate-[scan_2s_ease-in-out_infinite]"></div>
                </div>
              )}

              {/* Metallic reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>

              <div className="relative p-4 flex items-center gap-4">
                {/* Rank badge */}
                <div
                  className="flex-shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center border-2 backdrop-blur-sm"
                  style={{
                    borderColor: getMedalColor(player.rank),
                    background: `linear-gradient(135deg, ${getMedalColor(player.rank)}30, transparent)`,
                    boxShadow: player.rank <= 3 ? `0 0 20px ${getMedalColor(player.rank)}40` : 'none'
                  }}
                >
                  {player.rank <= 3 && (
                    <Trophy className="w-6 h-6 mb-1" style={{ color: getMedalColor(player.rank) }} />
                  )}
                  <div
                    className="font-bold text-lg"
                    style={{ color: getMedalColor(player.rank) }}
                  >
                    #{player.rank}
                  </div>
                </div>

                {/* Player info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-bold truncate ${isCurrentUser ? 'text-[#10f5a7]' : 'text-white'}`}>
                      {player.name}
                    </h3>
                    {isCurrentUser && (
                      <span className="px-2 py-0.5 rounded-full bg-[#10f5a7] text-[#0a0e1a] text-xs font-bold tracking-wider">
                        VOCÊ
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#00d9ff]" />
                      <span className="font-mono text-lg font-bold text-white">
                        {player.points.toLocaleString()}
                      </span>
                      <span className="text-xs text-[#8b92a0]">EP</span>
                    </div>

                    <div className="w-px h-6 bg-[rgba(16,245,167,0.2)]"></div>

                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-[#10f5a7]" />
                      <span className="text-sm text-[#10f5a7] font-semibold">
                        +{player.growth}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Glow indicator */}
                <div className={`flex-shrink-0 w-2 h-12 rounded-full ${
                  isCurrentUser ? 'bg-gradient-to-b from-[#10f5a7] to-[#00d9ff] shadow-[0_0_10px_#10f5a7]' : 'bg-[#3a4555]'
                }`}></div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
