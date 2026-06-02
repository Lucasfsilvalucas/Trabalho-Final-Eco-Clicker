import { useState } from "react";
import { useNavigate } from "react-router";
import { useGameStore } from "../store/gameStore";
import { login as loginBack4App } from "../services/auth";
import { loadProgress } from "../services/progress";

export default function Login() {
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
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Entrar</button>
    </form>
  );
}