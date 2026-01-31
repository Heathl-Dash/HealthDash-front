import { toggleLike } from "@/lib/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useToggleLike(publicationId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleLike(publicationId),

    onMutate: async () => {
      await queryClient.cancelQueries();

      const updateLikeState = (items?: IPublication[]) => {
        if (!items) return items;

        return items.map(item => {
          if (item.id !== publicationId) return item;

          const isLike = !item.isLike;
          const likesDelta = item.isLike ? -1 : 1;

          return {
            ...item,
            isLike,
            likesCount: Math.max(0, item.likesCount + likesDelta),
          };
        });
      };

      queryClient.setQueriesData(
        { predicate: query => Array.isArray(query.state.data) },
        updateLikeState
      );
    },
  });
}
