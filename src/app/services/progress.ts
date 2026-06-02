import Parse from "./parseConfig";

export interface PlayerProgressData {
  userId: string;
  playerName: string;
  totalPoints: number;
  pointsPerClick: number;
  pointsPerSecond: number;
  level: number;
  lastLogin?: Date;
}

function applyProgressACL(progress: any, user: any) {
  const acl = new Parse.ACL(user);
  acl.setPublicReadAccess(true);
  acl.setWriteAccess(user, true);
  progress.setACL(acl);
}

export async function loadProgress(userId: string) {
  const User = Parse.User;
  const userQuery = new Parse.Query(User);
  const user = await userQuery.get(userId);

  const PlayerProgress = Parse.Object.extend("PlayerProgress");
  const query = new Parse.Query(PlayerProgress);

  query.equalTo("user", user);
  query.descending("updatedAt");

  const progresses = await query.find();
  let progress = progresses[0];

  if (progresses.length > 1) {
    const duplicatedProgresses = progresses.slice(1);
    await Parse.Object.destroyAll(duplicatedProgresses);
  }

  if (!progress) {
    progress = new PlayerProgress();

    progress.set("user", user);
    progress.set("playerName", user.get("playerName") || user.get("username"));
    progress.set("totalPoints", 0);
    progress.set("pointsPerClick", 1);
    progress.set("pointsPerSecond", 0);
    progress.set("level", 1);
    progress.set("lastLogin", new Date());
  }

  applyProgressACL(progress, user);
  await progress.save();

  return {
    totalPoints: progress.get("totalPoints") ?? 0,
    pointsPerClick: progress.get("pointsPerClick") ?? 1,
    pointsPerSecond: progress.get("pointsPerSecond") ?? 0,
    level: progress.get("level") ?? 1,
    lastLogin: progress.get("lastLogin"),
  };
}

export async function saveProgress(data: PlayerProgressData) {
  const User = Parse.User;
  const userQuery = new Parse.Query(User);
  const user = await userQuery.get(data.userId);

  const PlayerProgress = Parse.Object.extend("PlayerProgress");
  const query = new Parse.Query(PlayerProgress);

  query.equalTo("user", user);
  query.descending("updatedAt");

  const progresses = await query.find();
  let progress = progresses[0];

  if (progresses.length > 1) {
    const duplicatedProgresses = progresses.slice(1);
    await Parse.Object.destroyAll(duplicatedProgresses);
  }

  if (!progress) {
    progress = new PlayerProgress();
    progress.set("user", user);
  }

  applyProgressACL(progress, user);

  progress.set("playerName", data.playerName);
  progress.set("totalPoints", data.totalPoints);
  progress.set("pointsPerClick", data.pointsPerClick);
  progress.set("pointsPerSecond", data.pointsPerSecond);
  progress.set("level", data.level);
  progress.set("lastLogin", data.lastLogin ?? new Date());

  return await progress.save();
}