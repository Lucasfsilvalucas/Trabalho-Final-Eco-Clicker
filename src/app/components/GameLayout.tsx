import { Outlet, Navigate } from 'react-router';
import { useGameStore } from '../store/gameStore';
import { SyncModal } from './SyncModal';
import { useEffect, useState } from 'react';

export function GameLayout() {
  const isAuthenticated = useGameStore((state) => state.isAuthenticated);
  const [showSyncModal, setShowSyncModal] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => setShowSyncModal(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Outlet />
      <SyncModal
        isOpen={showSyncModal}
        onClose={() => setShowSyncModal(false)}
        earnedPoints={1250}
      />
    </>
  );
}
