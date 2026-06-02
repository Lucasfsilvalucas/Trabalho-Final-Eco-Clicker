import { Outlet, Navigate } from 'react-router';
import { useGameStore } from '../store/gameStore';

export function AuthLayout() {
  const isAuthenticated = useGameStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/jogo" replace />;
  }

  return <Outlet />;
}
