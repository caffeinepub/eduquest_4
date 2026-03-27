import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Score } from "../backend.d";
import { useActor } from "./useActor";

export function useLeaderboard() {
  const { actor, isFetching } = useActor();
  return useQuery<Score[]>({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeaderboard();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCategoryLeaderboard(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Score[]>({
    queryKey: ["leaderboard", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategoryLeaderboard(category);
    },
    enabled: !!actor && !isFetching && !!category,
  });
}

export function useSubmitScore() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      playerName,
      score,
      category,
    }: { playerName: string; score: number; category: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitScore(playerName, BigInt(score), category);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
}
