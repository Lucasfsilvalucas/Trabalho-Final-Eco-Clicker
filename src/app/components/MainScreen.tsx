import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Zap, TrendingUp, Award, Settings } from 'lucide-react';
import { ParticleBackground } from './ParticleBackground';
import { useGameStore } from '../store/gameStore';

export function MainScreen() {
  const navigate = useNavigate();
  const username = useGameStore((state) => state.username);
  const ecoPoints = useGameStore((state) => state.ecoPoints);
  const addEcoPoints = useGameStore((state) => state.addEcoPoints);

  const [rotation, setRotation] = useState(0);
  const [isClicking, setIsClicking] = useState(false);
  const [clicksPerSecond, setClicksPerSecond] = useState(0);

  const handleReactorClick = () => {
    setIsClicking(true);
    addEcoPoints(1);
    setClicksPerSecond(prev => prev + 1);
    setTimeout(() => setIsClicking(false), 150);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const resetTimer = setInterval(() => {
      setClicksPerSecond(0);
    }, 1000);
    return () => clearInterval(resetTimer);
  }, []);

  return (
    <div className="relative size-full bg-[#0a0e1a] overflow-hidden">
      <ParticleBackground />
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#10f5a7 1px, transparent 1px), linear-gradient(90deg, #10f5a7 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 backdrop-blur-sm bg-gradient-to-b from-[rgba(10,14,26,0.8)] to-transparent">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm text-[#8b92a0] tracking-wider uppercase">Operador</h2>
            <h1 className="text-2xl font-bold text-white">{username}</h1>
          </div>
          <div className="text-right">
            <div className="text-xs text-[#8b92a0] tracking-wider uppercase mb-1">EcoPontos Total</div>
            <div className="font-mono text-3xl font-bold bg-gradient-to-r from-[#10f5a7] to-[#00d9ff] bg-clip-text text-transparent">
              {ecoPoints.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Main reactor */}
      <div className="relative z-10 flex flex-col items-center justify-center" style={{ height: 'calc(100% - 250px)' }}>
        {/* Stats display */}
        <div className="mb-8 backdrop-blur-lg bg-[rgba(15,25,35,0.4)] border border-[rgba(16,245,167,0.2)] rounded-xl px-6 py-3">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-[#10f5a7]" />
            <div className="font-mono text-lg text-white">
              <span className="text-[#8b92a0] text-sm mr-2">TAXA:</span>
              {clicksPerSecond} <span className="text-sm text-[#8b92a0]">EP/s</span>
            </div>
          </div>
        </div>

        {/* Reactor core */}
        <div className="relative">
          {/* Outer rings */}
          <div
            className="absolute inset-0 -m-20 border-2 border-[#10f5a7] rounded-full opacity-20"
            style={{ transform: `rotate(${rotation}deg)` }}
          ></div>
          <div
            className="absolute inset-0 -m-16 border-2 border-[#00d9ff] rounded-full opacity-20"
            style={{ transform: `rotate(${-rotation}deg)` }}
          ></div>

          {/* Core button */}
          <button
            onClick={handleReactorClick}
            className={`relative group transition-all duration-150 ${isClicking ? 'scale-95' : 'scale-100'}`}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#10f5a7] to-[#00d9ff] blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>

            {/* Core sphere */}
            <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-[#10f5a7] to-[#00d9ff] flex items-center justify-center border-4 border-white/20 shadow-[0_0_60px_rgba(16,245,167,0.6)] group-hover:shadow-[0_0_80px_rgba(16,245,167,0.8)]">
              {/* Inner crystal */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white/40 to-transparent backdrop-blur-sm flex items-center justify-center">
                <Zap className="w-12 h-12 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              </div>

              {/* Pulse rings */}
              {isClicking && (
                <>
                  <div className="absolute inset-0 rounded-full border-2 border-white animate-ping"></div>
                  <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
                </>
              )}
            </div>
          </button>

          {/* Rotating tech rings */}
          <div
            className="absolute inset-0 -m-24"
            style={{ transform: `rotate(${rotation * 2}deg)` }}
          >
            <div className="relative size-full">
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-[#10f5a7] rounded-full -translate-x-1/2 shadow-[0_0_10px_#10f5a7]"></div>
              <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-[#00d9ff] rounded-full -translate-x-1/2 shadow-[0_0_10px_#00d9ff]"></div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-[#8b92a0] tracking-wider uppercase">Reator Bio-Energético</p>
          <p className="text-xs text-[#5a6572] mt-1">Clique para gerar energia</p>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
        <div className="backdrop-blur-xl bg-[rgba(15,25,35,0.6)] border border-[rgba(16,245,167,0.2)] rounded-2xl p-2 shadow-[0_-4px_20px_rgba(16,245,167,0.1)]">
          <div className="flex justify-around items-center">
            <NavButton icon={<TrendingUp />} label="Upgrades" onClick={() => navigate('/jogo/upgrades')} />
            <NavButton icon={<Award />} label="Ranking" onClick={() => navigate('/jogo/ranking')} />
            <NavButton icon={<Settings />} label="Config" onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function NavButton({ icon, label, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-1 px-6 py-3 rounded-xl transition-all duration-300 hover:bg-[rgba(16,245,167,0.1)]"
    >
      <div className="text-[#8b92a0] group-hover:text-[#10f5a7] transition-colors">
        {icon}
      </div>
      <span className="text-xs text-[#8b92a0] group-hover:text-[#10f5a7] tracking-wide transition-colors">
        {label}
      </span>
    </button>
  );
}
