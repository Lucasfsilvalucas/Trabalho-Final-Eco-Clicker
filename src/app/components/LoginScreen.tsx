import { useState } from "react";
import { useNavigate } from "react-router";
import { useGameStore } from "../store/gameStore";
import { login as loginBack4App } from "../services/auth";
import { loadProgress } from "../services/progress";

export function LoginScreen() {
  const navigate = useNavigate();

  const login = useGameStore((state) => state.login);
  const setStateFromBackend = useGameStore((state) => state.setStateFromBackend);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = await loginBack4App(email, password);

    if (!user) return;

    const userId = user.id;
    const username = user.get("playerName") || user.get("username");
    const savedEmail = user.get("email") || email;

    login(userId, username, savedEmail);

    const progress = await loadProgress(userId);

    setStateFromBackend({
      points: progress.totalPoints,
      pointsPerClick: progress.pointsPerClick,
      pointsPerSecond: progress.pointsPerSecond,
      level: progress.level,
    });

    navigate("/jogo");
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-[rgba(16,245,167,0.25)] bg-[rgba(15,25,35,0.8)] p-6 text-white"
      >
        <h1 className="text-2xl font-bold text-[#10f5a7] mb-2">
          EcoClicker
        </h1>

        <p className="text-sm text-[#8b92a0] mb-6">
          Entre para continuar gerando energia limpa.
        </p>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 rounded-lg bg-[#0a0e1a] border border-[rgba(16,245,167,0.25)] px-4 py-3 outline-none"
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 rounded-lg bg-[#0a0e1a] border border-[rgba(16,245,167,0.25)] px-4 py-3 outline-none"
          required
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-gradient-to-r from-[#10f5a7] to-[#00d9ff] py-3 font-bold text-[#0a0e1a]"
        >
          Entrar
        </button>

        <button
          type="button"
          onClick={() => navigate("/cadastro")}
          className="w-full mt-4 text-sm text-[#10f5a7]"
        >
          Criar conta
        </button>
      </form>
    </div>
  );
}