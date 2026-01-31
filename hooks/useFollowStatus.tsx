import { getFollow } from "@/lib/profile";
import { useQuery } from "@tanstack/react-query";


export function useFollowStatus(userId?: number) {
  return useQuery({
    queryKey: ["follow-status", userId],
    queryFn: () => getFollow(userId as number),
    enabled: !!userId,
  });
}
