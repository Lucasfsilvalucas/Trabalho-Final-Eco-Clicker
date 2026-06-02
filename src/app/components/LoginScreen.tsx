import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ParticleBackground } from './ParticleBackground';
import { useGameStore } from '../store/gameStore';

export function LoginScreen() {
  const navigate = useNavigate();
  const login = useGameStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      const username = email.split('@')[0];
      login(username, email);
      navigate('/jogo');
    }
  };

  return (
    <div className="relative size-full flex items-center justify-center overflow-hidden bg-[#0a0e1a]">
      <ParticleBackground />
      {/* Animated circuit roots background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="size-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10 10 L30 10 L30 30 M30 30 L50 30 L50 50 M70 10 L70 30 L90 30"
                    stroke="#10f5a7"
                    strokeWidth="0.5"
                    fill="none"
                    opacity="0.3">
                <animate attributeName="stroke-opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite"/>
              </path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
      </div>

      {/* Glassmorphism container */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="backdrop-blur-xl bg-gradient-to-br from-[rgba(15,25,35,0.6)] to-[rgba(10,14,26,0.4)] border border-[rgba(16,245,167,0.2)] rounded-2xl p-8 shadow-[0_8px_32px_rgba(16,245,167,0.1)]">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#10f5a7] to-[#00d9ff] bg-clip-text text-transparent mb-2">
              Acesso à Rede Verde
            </h1>
            <p className="text-[#8b92a0] text-sm tracking-wide uppercase">Sistema de Energia Sustentável</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email input */}
            <div className="relative">
              <label className="block text-sm text-[#10f5a7] mb-2 tracking-wide">E-MAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
                className={`w-full px-4 py-3 bg-[rgba(15,25,35,0.4)] border-2 rounded-lg text-white outline-none transition-all duration-300 ${
                  focusedInput === 'email'
                    ? 'border-[#10f5a7] shadow-[0_0_20px_rgba(16,245,167,0.3)]'
                    : 'border-[rgba(16,245,167,0.2)]'
                }`}
                placeholder="usuario@rede.eco"
              />
            </div>

            {/* Password input */}
            <div className="relative">
              <label className="block text-sm text-[#10f5a7] mb-2 tracking-wide">SENHA</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                className={`w-full px-4 py-3 bg-[rgba(15,25,35,0.4)] border-2 rounded-lg text-white outline-none transition-all duration-300 ${
                  focusedInput === 'password'
                    ? 'border-[#10f5a7] shadow-[0_0_20px_rgba(16,245,167,0.3)]'
                    : 'border-[rgba(16,245,167,0.2)]'
                }`}
                placeholder="••••••••"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="group relative w-full py-4 mt-8 bg-gradient-to-r from-[#5a6572] to-[#3a4555] border border-[#10f5a7] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,245,167,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#10f5a7] to-[#00d9ff] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="relative text-white tracking-[0.2em] uppercase font-semibold">Entrar</span>
            </button>

            {/* Register button */}
            <button
              type="button"
              onClick={() => navigate('/cadastro')}
              className="group relative w-full py-3 bg-transparent border-2 border-[rgba(16,245,167,0.3)] rounded-lg overflow-hidden transition-all duration-300 hover:border-[#10f5a7] hover:bg-[rgba(16,245,167,0.05)]"
            >
              <span className="relative text-[#10f5a7] tracking-wide font-normal group-hover:text-white transition-colors">
                Realizar cadastro
              </span>
            </button>
          </form>

          {/* Footer decoration */}
          <div className="mt-8 pt-6 border-t border-[rgba(16,245,167,0.1)] text-center">
            <p className="text-xs text-[#8b92a0] tracking-wider">
              ECOCLICKER v3.0 | SISTEMA SOLARPUNK
            </p>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-[#10f5a7] rounded-tl-2xl opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-[#00d9ff] rounded-br-2xl opacity-50"></div>
      </div>
    </div>
  );
}
