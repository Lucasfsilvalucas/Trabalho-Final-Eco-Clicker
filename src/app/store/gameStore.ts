import { create } from "zustand";

export interface GameState {
  isAuthenticated: boolean;

  userId: string;
  username: string;
  email: string;

  points: number;
  level: number;

  pointsPerClick: number;
  pointsPerSecond: number;

  soundEnabled: boolean;
  systemMode: "performance" | "eco";
  accountPublic: boolean;

  login: (userId: string, username: string, email: string) => void;
  logout: () => void;

  setStateFromBackend: (data: Partial<GameState>) => void;

  setPoints: (value: number) => void;
  addPoints: (value: number) => void;
  spendPoints: (value: number) => void;

  setLevel: (value: number) => void;
  setPointsPerClick: (value: number) => void;
  setPointsPerSecond: (value: number) => void;

  applyClickUpgrade: (value: number) => void;
  applyAutoUpgrade: (value: number) => void;

  toggleSound: () => void;
  setSystemMode: (mode: "performance" | "eco") => void;
  toggleAccountPrivacy: () => void;

  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  isAuthenticated: false,

  userId: "",
  username: "",
  email: "",

  points: 0,
  level: 1,

  pointsPerClick: 1,
  pointsPerSecond: 0,

  soundEnabled: true,
  systemMode: "eco",
  accountPublic: true,

  login: (userId, username, email) =>
    set({
      isAuthenticated: true,
      userId,
      username,
      email,
    }),

  logout: () =>
    set({
      isAuthenticated: false,
      userId: "",
      username: "",
      email: "",
      points: 0,
      level: 1,
      pointsPerClick: 1,
      pointsPerSecond: 0,
    }),

  setStateFromBackend: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),

  setPoints: (value) => set({ points: value }),

  addPoints: (value) =>
    set((state) => ({
      points: state.points + value,
    })),

  spendPoints: (value) =>
    set((state) => ({
      points: Math.max(0, state.points - value),
    })),

  setLevel: (value) => set({ level: value }),

  setPointsPerClick: (value) => set({ pointsPerClick: value }),

  setPointsPerSecond: (value) => set({ pointsPerSecond: value }),

  applyClickUpgrade: (value) =>
    set((state) => ({
      pointsPerClick: state.pointsPerClick + value,
    })),

  applyAutoUpgrade: (value) =>
    set((state) => ({
      pointsPerSecond: state.pointsPerSecond + value,
    })),

  toggleSound: () =>
    set((state) => ({
      soundEnabled: !state.soundEnabled,
    })),

  setSystemMode: (mode) => set({ systemMode: mode }),

  toggleAccountPrivacy: () =>
    set((state) => ({
      accountPublic: !state.accountPublic,
    })),

  resetGame: () =>
    set({
      points: 0,
      level: 1,
      pointsPerClick: 1,
      pointsPerSecond: 0,
    }),
}));