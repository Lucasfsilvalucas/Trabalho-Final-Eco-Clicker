import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ParticleBackground } from './ParticleBackground';
import { useGameStore } from '../store/gameStore';
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export function RegisterScreen() {
  const navigate = useNavigate();
  const login = useGameStore((state) => state.login);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!username.trim()) {
      newErrors.username = 'Nome de usuário é obrigatório';
    } else if (username.length < 3) {
      newErrors.username = 'Mínimo de 3 caracteres';
    }

    if (!email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 6) {
      newErrors.password = 'Mínimo de 6 caracteres';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
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
            <pattern id="circuit-pattern-register" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10 10 L30 10 L30 30 M30 30 L50 30 L50 50 M70 10 L70 30 L90 30"
                    stroke="#10f5a7"
                    strokeWidth="0.5"
                    fill="none"
                    opacity="0.3">
                <animate attributeName="stroke-opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite"/>
              </path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-pattern-register)" />
        </svg>
      </div>

      {/* Glassmorphism container */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="backdrop-blur-xl bg-gradient-to-br from-[rgba(15,25,35,0.6)] to-[rgba(10,14,26,0.4)] border border-[rgba(16,245,167,0.2)] rounded-2xl p-8 shadow-[0_8px_32px_rgba(16,245,167,0.1)]">
          {/* Back button */}
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-[#8b92a0] hover:text-[#10f5a7] transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm tracking-wide">Voltar</span>
          </button>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#10f5a7] to-[#00d9ff] bg-clip-text text-transparent mb-2">
              Novo Operador
            </h1>
            <p className="text-[#8b92a0] text-sm tracking-wide uppercase">Registro na Rede Verde</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username input */}
            <div className="relative">
              <label className="block text-sm text-[#10f5a7] mb-2 tracking-wide">NOME DE USUÁRIO</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b92a0]">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errors.username) setErrors({...errors, username: ''});
                  }}
                  onFocus={() => setFocusedInput('username')}
                  onBlur={() => setFocusedInput(null)}
                  className={`w-full pl-12 pr-4 py-3 bg-[rgba(15,25,35,0.4)] border-2 rounded-lg text-white outline-none transition-all duration-300 ${
                    errors.username
                      ? 'border-red-500'
                      : focusedInput === 'username'
                      ? 'border-[#10f5a7] shadow-[0_0_20px_rgba(16,245,167,0.3)]'
                      : 'border-[rgba(16,245,167,0.2)]'
                  }`}
                  placeholder="Digite seu nome de usuário"
                />
              </div>
              {errors.username && (
                <p className="text-red-400 text-xs mt-1 ml-1">{errors.username}</p>
              )}
            </div>

            {/* Email input */}
            <div className="relative">
              <label className="block text-sm text-[#10f5a7] mb-2 tracking-wide">E-MAIL</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b92a0]">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({...errors, email: ''});
                  }}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  className={`w-full pl-12 pr-4 py-3 bg-[rgba(15,25,35,0.4)] border-2 rounded-lg text-white outline-none transition-all duration-300 ${
                    errors.email
                      ? 'border-red-500'
                      : focusedInput === 'email'
                      ? 'border-[#10f5a7] shadow-[0_0_20px_rgba(16,245,167,0.3)]'
                      : 'border-[rgba(16,245,167,0.2)]'
                  }`}
                  placeholder="usuario@rede.eco"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>
              )}
            </div>

            {/* Password input */}
            <div className="relative">
              <label className="block text-sm text-[#10f5a7] mb-2 tracking-wide">SENHA</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b92a0]">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({...errors, password: ''});
                  }}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  className={`w-full pl-12 pr-12 py-3 bg-[rgba(15,25,35,0.4)] border-2 rounded-lg text-white outline-none transition-all duration-300 ${
                    errors.password
                      ? 'border-red-500'
                      : focusedInput === 'password'
                      ? 'border-[#10f5a7] shadow-[0_0_20px_rgba(16,245,167,0.3)]'
                      : 'border-[rgba(16,245,167,0.2)]'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b92a0] hover:text-[#10f5a7] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1 ml-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password input */}
            <div className="relative">
              <label className="block text-sm text-[#10f5a7] mb-2 tracking-wide">CONFIRMAR SENHA</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b92a0]">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) setErrors({...errors, confirmPassword: ''});
                  }}
                  onFocus={() => setFocusedInput('confirmPassword')}
                  onBlur={() => setFocusedInput(null)}
                  className={`w-full pl-12 pr-12 py-3 bg-[rgba(15,25,35,0.4)] border-2 rounded-lg text-white outline-none transition-all duration-300 ${
                    errors.confirmPassword
                      ? 'border-red-500'
                      : focusedInput === 'confirmPassword'
                      ? 'border-[#10f5a7] shadow-[0_0_20px_rgba(16,245,167,0.3)]'
                      : 'border-[rgba(16,245,167,0.2)]'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b92a0] hover:text-[#10f5a7] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1 ml-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="group relative w-full py-4 mt-8 bg-gradient-to-r from-[#5a6572] to-[#3a4555] border border-[#10f5a7] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,245,167,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#10f5a7] to-[#00d9ff] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="relative text-white tracking-[0.2em] uppercase font-semibold">Registrar na Rede</span>
            </button>
          </form>

          {/* Footer with return link */}
          <div className="mt-8 pt-6 border-t border-[rgba(16,245,167,0.1)] text-center">
            <button
              onClick={() => navigate('/login')}
              className="text-sm text-[#8b92a0] hover:text-[#10f5a7] transition-colors"
            >
              Já tenho conta. <span className="text-[#10f5a7]">Voltar ao Login</span>
            </button>
          </div>

          {/* Footer decoration */}
          <div className="mt-4 text-center">
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
