import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useGameStore } from "../store/gameStore";
import { logout as logoutBack4App } from "../services/auth";

export function ConfigScreen() {
  const navigate = useNavigate();

  const [tab, setTab] = useState<"som" | "sistema" | "conta">("som");

  const sound = useGameStore((state) => state.soundEnabled);
  const toggleSound = useGameStore((state) => state.toggleSound);

  const mode = useGameStore((state) => state.systemMode);
  const setSystemMode = useGameStore((state) => state.setSystemMode);

  const privacy = useGameStore((state) => state.accountPublic);
  const togglePrivacy = useGameStore((state) => state.toggleAccountPrivacy);

  const logout = useGameStore((state) => state.logout);

  const handleLogout = async () => {
    await logoutBack4App();
    logout();
    navigate("/login");
  };

  return (
    <div className="p-6 text-white bg-[#0a0e1a] min-h-screen">
      <button
        onClick={() => navigate("/jogo")}
        className="flex items-center gap-2 text-[#10f5a7] mb-4"
      >
        <ArrowLeft />
        Voltar
      </button>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("som")}
          className={`px-3 py-1 rounded ${
            tab === "som"
              ? "bg-[#10f5a7] text-black"
              : "text-white border border-gray-600"
          }`}
        >
          SOM
        </button>

        <button
          onClick={() => setTab("sistema")}
          className={`px-3 py-1 rounded ${
            tab === "sistema"
              ? "bg-[#10f5a7] text-black"
              : "text-white border border-gray-600"
          }`}
        >
          SISTEMA
        </button>

        <button
          onClick={() => setTab("conta")}
          className={`px-3 py-1 rounded ${
            tab === "conta"
              ? "bg-[#10f5a7] text-black"
              : "text-white border border-gray-600"
          }`}
        >
          CONTA
        </button>
      </div>

      <div className="border border-[rgba(16,245,167,0.15)] p-4 rounded-xl">
        {tab === "som" && (
          <div>
            <p className="mb-2">Som: {sound ? "ON" : "OFF"}</p>

            <button
              onClick={toggleSound}
              className="px-4 py-2 border border-[#10f5a7] text-[#10f5a7] rounded"
            >
              Alternar
            </button>
          </div>
        )}

        {tab === "sistema" && (
          <div>
            <p className="mb-2">Modo: {mode}</p>

            <button
              onClick={() =>
                setSystemMode(mode === "eco" ? "performance" : "eco")
              }
              className="px-4 py-2 border border-[#10f5a7] text-[#10f5a7] rounded"
            >
              Alternar modo
            </button>
          </div>
        )}

        {tab === "conta" && (
          <div className="space-y-4">
            <div>
              <p className="mb-2">
                Conta pública: {privacy ? "Sim" : "Não"}
              </p>

              <button
                onClick={togglePrivacy}
                className="px-4 py-2 border border-[#10f5a7] text-[#10f5a7] rounded"
              >
                Alternar
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-red-500 text-red-400 rounded"
            >
              Sair da conta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}