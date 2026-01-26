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

      const previousQueries = queryClient.getQueriesData({
        predicate: (query) => Array.isArray(query.state.data),
      });

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

      return { previousQueries };
    },
    onError: (_error, _variables, context) => {
      context?.previousQueries?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
  });
}
