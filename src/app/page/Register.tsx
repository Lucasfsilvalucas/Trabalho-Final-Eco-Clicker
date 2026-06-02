import { useState } from "react";
import { useNavigate } from "react-router";
import { useGameStore } from "../store/gameStore";
import { cadastrarUsuario } from "../services/auth";

export default function Register() {
  const navigate = useNavigate();

  const login = useGameStore((state) => state.login);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    const user = await cadastrarUsuario(username, email, password);

    if (!user) return;

    login(user.id, username, email);

    navigate("/jogo");
  }

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Cadastrar</button>
    </form>
  );
}