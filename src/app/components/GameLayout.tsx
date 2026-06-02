import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { useGameStore } from "../store/gameStore";
import { loadProgress, saveProgress } from "../services/progress";
import { calculateOfflinePoints } from "../services/offline";
import { SyncModal } from "./SyncModal";

export function GameLayout() {
  const isAuthenticated = useGameStore((state) => state.isAuthenticated);
  const userId = useGameStore((state) => state.userId);
  const username = useGameStore((state) => state.username);
  const points = useGameStore((state) => state.points);
  const level = useGameStore((state) => state.level);
  const pointsPerClick = useGameStore((state) => state.pointsPerClick);
  const pointsPerSecond = useGameStore((state) => state.pointsPerSecond);
  const setStateFromBackend = useGameStore((state) => state.setStateFromBackend);
  const addPoints = useGameStore((state) => state.addPoints);

  const [syncOpen, setSyncOpen] = useState(false);
  const [offlinePoints, setOfflinePoints] = useState(0);
  const [offlineTime, setOfflineTime] = useState("0m");
  const [progressLoaded, setProgressLoaded] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !userId) return;

    let active = true;

    async function loadPlayerProgress() {
      setProgressLoaded(false);

      const progress = await loadProgress(userId);

      if (!active) return;

      const last = progress.lastLogin
        ? new Date(progress.lastLogin)
        : new Date();

      const now = new Date();

      const diffSeconds = Math.max(
        0,
        Math.floor((now.getTime() - last.getTime()) / 1000)
      );

      const hours = Math.floor(diffSeconds / 3600);
      const minutes = Math.floor((diffSeconds % 3600) / 60);

      const formattedOfflineTime =
        hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

      const earnedOfflinePoints = calculateOfflinePoints(
        progress.lastLogin,
        progress.pointsPerSecond
      );

      const updatedPoints = progress.totalPoints + earnedOfflinePoints;

      setStateFromBackend({
        points: progress.totalPoints,
        pointsPerClick: progress.pointsPerClick,
        pointsPerSecond: progress.pointsPerSecond,
        level: progress.level,
      });

      if (earnedOfflinePoints > 0) {
        addPoints(earnedOfflinePoints);
        setOfflinePoints(earnedOfflinePoints);
        setOfflineTime(formattedOfflineTime);
        setSyncOpen(true);
      }

      await saveProgress({
        userId,
        playerName: username,
        totalPoints: updatedPoints,
        pointsPerClick: progress.pointsPerClick,
        pointsPerSecond: progress.pointsPerSecond,
        level: progress.level,
        lastLogin: new Date(),
      });

      setProgressLoaded(true);
    }

    loadPlayerProgress();

    return () => {
      active = false;
    };
  }, [isAuthenticated, userId, username, setStateFromBackend, addPoints]);

  useEffect(() => {
    if (!isAuthenticated || !userId || !progressLoaded) return;

    const interval = setInterval(() => {
      saveProgress({
        userId,
        playerName: username,
        totalPoints: points,
        pointsPerClick,
        pointsPerSecond,
        level,
        lastLogin: new Date(),
      });
    }, 5000);

    return () => {
      clearInterval(interval);

      saveProgress({
        userId,
        playerName: username,
        totalPoints: points,
        pointsPerClick,
        pointsPerSecond,
        level,
        lastLogin: new Date(),
      });
    };
  }, [
    isAuthenticated,
    userId,
    username,
    points,
    pointsPerClick,
    pointsPerSecond,
    level,
    progressLoaded,
  ]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Outlet />

      <SyncModal
        isOpen={syncOpen}
        onClose={() => {
          setSyncOpen(false);
        }}
        earnedPoints={offlinePoints}
        offlineTime={offlineTime}
      />
    </>
  );
}