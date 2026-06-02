import { useNavigate } from 'react-router';
import { ArrowLeft, Zap, Wind, Factory } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

interface Upgrade {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  level: number;
  cost: number;
  production: number;
  color: string;
}

export function UpgradesScreen() {
  const navigate = useNavigate();
  const ecoPoints = useGameStore((state) => state.ecoPoints);
  const spendEcoPoints = useGameStore((state) => state.spendEcoPoints);
  const upgrades: Upgrade[] = [
    {
      id: 'solar',
      name: 'Painel Solar de Grafeno',
      description: 'Geração fotovoltaica de alta eficiência usando nanotecnologia',
      icon: <Zap className="w-8 h-8" />,
      level: 3,
      cost: 100,
      production: 5,
      color: '#10f5a7'
    },
    {
      id: 'wind',
      name: 'Turbina Eólica Aerodinâmica',
      description: 'Design otimizado para captura máxima de energia cinética',
      icon: <Wind className="w-8 h-8" />,
      level: 2,
      cost: 250,
      production: 12,
      color: '#00d9ff'
    },
    {
      id: 'bio',
      name: 'Biorreator de Algas',
      description: 'Conversão de biomassa em energia limpa e sustentável',
      icon: <Factory className="w-8 h-8" />,
      level: 1,
      cost: 500,
      production: 25,
      color: '#10f5a7'
    }
  ];

  const handlePurchase = (upgrade: Upgrade) => {
    if (ecoPoints >= upgrade.cost) {
      spendEcoPoints(upgrade.cost);
    }
  };

  return (
    <div className="relative size-full bg-[#0a0e1a] overflow-y-auto">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #10f5a7 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
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

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#10f5a7] to-[#00d9ff] bg-clip-text text-transparent">
                Upgrade de Infraestrutura
              </h1>
              <p className="text-sm text-[#8b92a0] mt-1">Evolua seus sistemas de geração</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-[#8b92a0] tracking-wider uppercase">Saldo</div>
              <div className="font-mono text-2xl font-bold text-[#10f5a7]">
                {ecoPoints.toLocaleString()} EP
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrades list */}
      <div className="relative z-10 p-6 space-y-4">
        {upgrades.map((upgrade) => (
          <div
            key={upgrade.id}
            className="group backdrop-blur-xl bg-gradient-to-br from-[rgba(15,25,35,0.6)] to-[rgba(10,14,26,0.4)] border border-[rgba(16,245,167,0.2)] rounded-2xl overflow-hidden hover:border-[rgba(16,245,167,0.5)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,245,167,0.2)]"
          >
            {/* Holographic shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

            <div className="relative p-6">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center border-2 backdrop-blur-sm"
                  style={{
                    borderColor: upgrade.color,
                    background: `linear-gradient(135deg, ${upgrade.color}20, transparent)`,
                    boxShadow: `0 0 20px ${upgrade.color}30`
                  }}
                >
                  <div style={{ color: upgrade.color }}>
                    {upgrade.icon}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-bold text-white text-lg">{upgrade.name}</h3>
                      <p className="text-sm text-[#8b92a0] mt-1">{upgrade.description}</p>
                    </div>
                    <div className="flex-shrink-0 px-3 py-1 rounded-full bg-[rgba(16,245,167,0.1)] border border-[#10f5a7]">
                      <span className="text-xs text-[#10f5a7] font-mono tracking-wider">
                        LVL {upgrade.level}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-[#8b92a0] mb-2">
                      <span>Eficiência</span>
                      <span>{upgrade.level * 33}%</span>
                    </div>
                    <div className="h-2 bg-[rgba(15,25,35,0.6)] rounded-full overflow-hidden border border-[rgba(16,245,167,0.2)]">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${upgrade.level * 33}%`,
                          background: `linear-gradient(90deg, ${upgrade.color}, ${upgrade.color}80)`,
                          boxShadow: `0 0 10px ${upgrade.color}`
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="text-xs text-[#8b92a0]">Produção</div>
                        <div className="font-mono font-bold text-[#10f5a7]">
                          +{upgrade.production} EP/s
                        </div>
                      </div>
                      <div className="w-px h-8 bg-[rgba(16,245,167,0.2)]"></div>
                      <div>
                        <div className="text-xs text-[#8b92a0]">Próximo nível</div>
                        <div className="font-mono font-bold text-[#00d9ff]">
                          {upgrade.cost} EP
                        </div>
                      </div>
                    </div>

                    {/* Purchase button */}
                    <button
                      onClick={() => handlePurchase(upgrade)}
                      disabled={ecoPoints < upgrade.cost}
                      className={`px-6 py-2 rounded-lg border-2 font-semibold tracking-wide transition-all duration-300 ${
                        ecoPoints >= upgrade.cost
                          ? 'border-[#10f5a7] text-[#10f5a7] hover:bg-[#10f5a7] hover:text-[#0a0e1a] hover:shadow-[0_0_20px_rgba(16,245,167,0.5)]'
                          : 'border-[#3a4555] text-[#5a6572] cursor-not-allowed opacity-50'
                      }`}
                    >
                      {ecoPoints >= upgrade.cost ? 'UPGRADE' : 'BLOQUEADO'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
