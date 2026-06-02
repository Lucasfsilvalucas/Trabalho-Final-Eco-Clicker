import { X, Battery, CheckCircle } from "lucide-react";

interface SyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  earnedPoints: number;
  offlineTime: string;
}

export function SyncModal({
  isOpen,
  onClose,
  earnedPoints,
  offlineTime,
}: SyncModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-md animate-[glitchIn_0.3s_ease-out]">
        <div className="absolute inset-0 border-2 border-[#10f5a7] rounded-2xl animate-[glitch_0.3s_ease-out]"></div>
        <div className="absolute inset-0 border-2 border-[#00d9ff] rounded-2xl animate-[glitch_0.3s_ease-out_0.1s]"></div>

        <div className="relative backdrop-blur-xl bg-gradient-to-br from-[rgba(15,25,35,0.95)] to-[rgba(10,14,26,0.95)] border-2 border-[rgba(16,245,167,0.3)] rounded-2xl p-8 shadow-[0_0_60px_rgba(16,245,167,0.4)]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#8b92a0] hover:text-[#10f5a7] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#10f5a7] to-[#00d9ff] blur-2xl opacity-50"></div>
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#10f5a7] to-[#00d9ff] flex items-center justify-center border-4 border-white/20 shadow-[0_0_40px_rgba(16,245,167,0.6)]">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-[#10f5a7] to-[#00d9ff] bg-clip-text text-transparent mb-2">
            Carga Concluída
          </h2>

          <p className="text-center text-[#8b92a0] text-sm mb-8">
            Sincronização com a Rede concluída
          </p>

          <div className="backdrop-blur-lg bg-[rgba(15,25,35,0.4)] border border-[rgba(16,245,167,0.3)] rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#8b92a0] tracking-wide">
                EcoPontos Recuperados
              </span>
              <Battery className="w-6 h-6 text-[#10f5a7] animate-pulse" />
            </div>

            <div className="text-center">
              <div className="font-mono text-5xl font-bold bg-gradient-to-r from-[#10f5a7] to-[#00d9ff] bg-clip-text text-transparent mb-2">
                +{earnedPoints.toLocaleString()}
              </div>
              <div className="text-sm text-[#8b92a0]">
                dos coletores offline
              </div>
            </div>

            <div className="mt-6">
              <div className="h-3 bg-[rgba(15,25,35,0.6)] rounded-full overflow-hidden border border-[rgba(16,245,167,0.2)]">
                <div
                  className="h-full bg-gradient-to-r from-[#10f5a7] to-[#00d9ff] rounded-full animate-[charge_2s_ease-out]"
                  style={{
                    boxShadow: "0 0 20px rgba(16,245,167,0.8)",
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="backdrop-blur-lg bg-[rgba(15,25,35,0.4)] border border-[rgba(16,245,167,0.2)] rounded-lg p-3 text-center">
              <div className="text-xs text-[#8b92a0] mb-1">
                Coletores Ativos
              </div>
              <div className="text-xl font-bold text-[#10f5a7]">3/3</div>
            </div>

            <div className="backdrop-blur-lg bg-[rgba(15,25,35,0.4)] border border-[rgba(16,245,167,0.2)] rounded-lg p-3 text-center">
              <div className="text-xs text-[#8b92a0] mb-1">Tempo Offline</div>
              <div className="text-xl font-bold text-[#00d9ff]">
                {offlineTime}
              </div>
            </div>
          </div>

          <div className="border-t border-[rgba(16,245,167,0.2)] pt-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-[#10f5a7] shadow-[0_0_10px_#10f5a7] animate-pulse"></div>
              <div className="flex-1">
                <p className="text-sm text-[#8b92a0] leading-relaxed">
                  Seus sistemas de geração automática continuaram operando
                  durante sua ausência. A energia acumulada foi transferida para
                  seu saldo principal.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-6 py-3 bg-gradient-to-r from-[#10f5a7] to-[#00d9ff] rounded-lg text-[#0a0e1a] font-bold tracking-wide hover:shadow-[0_0_30px_rgba(16,245,167,0.5)] transition-all duration-300"
          >
            CONTINUAR
          </button>
        </div>
      </div>

      <style>{`
        @keyframes glitchIn {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes glitch {
          0%, 100% { transform: translate(0); opacity: 0.3; }
          25% { transform: translate(2px, 2px); opacity: 0.5; }
          50% { transform: translate(-2px, -2px); opacity: 0.3; }
          75% { transform: translate(2px, -2px); opacity: 0.5; }
        }

        @keyframes charge {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}