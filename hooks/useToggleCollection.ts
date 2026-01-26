import { addPostToCollection, deletePostToCollection } from "@/lib/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ToggleCollectionInput = {
  isCollected: boolean;
  collectionId: number;
};

export function useToggleCollection(publicationId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ isCollected, collectionId }: ToggleCollectionInput) =>
      isCollected
        ? deletePostToCollection(collectionId, publicationId)
        : addPostToCollection(collectionId, publicationId),
    onMutate: async ({ isCollected }) => {
      await queryClient.cancelQueries();

      const nextIsCollected = !isCollected;

      const updateCollectionState = (items?: IPublication[]) => {
        if (!items) return items;

        return items.map((item) =>
          item.id === publicationId
            ? {
                ...item,
                isCollected: nextIsCollected,
              }
            : item
        );
      };

      queryClient.setQueriesData(
        { predicate: (query) => Array.isArray(query.state.data) },
        updateCollectionState
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["profile-posts"] });
    },
  });
}
