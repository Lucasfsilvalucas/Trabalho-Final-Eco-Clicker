import { useState } from "react";
import { useNavigate } from "react-router";
import { useGameStore } from "../store/gameStore";
import { cadastrarUsuario } from "../services/auth";

export function RegisterScreen() {
  const navigate = useNavigate();
  const login = useGameStore((state) => state.login);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const user = await cadastrarUsuario(username, email, password);

      const userId = user.id;
      const playerName = user.get("playerName") || username;
      const savedEmail = user.get("email") || email;

      login(userId, playerName, savedEmail);

      navigate("/jogo");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar usuário. Verifique os dados ou tente outro e-mail.");
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-[rgba(16,245,167,0.25)] bg-[rgba(15,25,35,0.8)] p-6 text-white"
      >
        <h1 className="text-2xl font-bold text-[#10f5a7] mb-2">
          Criar conta
        </h1>

        <input
          type="text"
          placeholder="Nome do jogador"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 rounded-lg bg-[#0a0e1a] border border-[rgba(16,245,167,0.25)] px-4 py-3 outline-none"
          required
        />

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
          Cadastrar
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full mt-4 text-sm text-[#10f5a7]"
        >
          Já tenho conta
        </button>
      </form>
    </div>
  );
}