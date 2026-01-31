import { setFollow } from "@/lib/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useToggleFollow(userId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => setFollow(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["follow-status", userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["profile", userId],
      });
    },
  });
}
