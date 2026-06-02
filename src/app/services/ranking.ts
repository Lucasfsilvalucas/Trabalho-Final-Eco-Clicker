import Parse from "./parseConfig";

export interface RankingPlayer {
  position: number;
  playerName: string;
  totalPoints: number;
}

export async function getRanking(): Promise<RankingPlayer[]> {
  const PlayerProgress = Parse.Object.extend("PlayerProgress");
  const query = new Parse.Query(PlayerProgress);

  query.descending("totalPoints");
  query.limit(50);

  const results = await query.find();

  return results.map((player: any, index: number) => ({
    position: index + 1,
    playerName: player.get("playerName") ?? "Jogador",
    totalPoints: player.get("totalPoints") ?? 0,
  }));
}