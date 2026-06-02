import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameState {
  isAuthenticated: boolean;
  username: string;
  email: string;
  ecoPoints: number;
  login: (username: string, email: string) => void;
  logout: () => void;
  addEcoPoints: (points: number) => void;
  spendEcoPoints: (points: number) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      username: '',
      email: '',
      ecoPoints: 45000,
      login: (username, email) =>
        set({ isAuthenticated: true, username, email }),
      logout: () =>
        set({ isAuthenticated: false, username: '', email: '' }),
      addEcoPoints: (points) =>
        set((state) => ({ ecoPoints: state.ecoPoints + points })),
      spendEcoPoints: (points) =>
        set((state) => ({ ecoPoints: state.ecoPoints - points })),
    }),
    {
      name: 'ecoclicker-storage',
    }
  )
);
