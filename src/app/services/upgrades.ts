import Parse from "./parseConfig";

export async function buyUpgrade(userId: string, upgradeId: string) {
  return await Parse.Cloud.run("buyUpgrade", {
    userId,
    upgradeId,
  });
}