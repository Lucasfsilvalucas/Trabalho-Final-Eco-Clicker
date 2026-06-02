export function calculateOfflinePoints(
  lastLogin: Date | string | null | undefined,
  pointsPerSecond: number
) {
  if (!lastLogin || pointsPerSecond <= 0) return 0;

  const last = new Date(lastLogin);
  const now = new Date();

  const diffSeconds = Math.floor((now.getTime() - last.getTime()) / 1000);

  if (diffSeconds <= 0) return 0;

  return diffSeconds * pointsPerSecond;
}