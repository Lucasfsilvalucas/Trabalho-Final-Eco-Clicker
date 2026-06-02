import Parse from "./parseConfig";

export async function calculateOfflineGain(
  userId: string,
  offlineSeconds: number
) {
  return await Parse.Cloud.run("calculateOfflineGain", {
    userId,
    offlineSeconds,
  });
}