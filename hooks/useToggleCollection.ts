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
    onMutate: async ({ isCollected, collectionId }) => {
      await queryClient.cancelQueries();

      const nextIsCollected = !isCollected;

      const previousQueries = queryClient.getQueriesData({
        predicate: (query) => Array.isArray(query.state.data),
      });
      const previousCollection = queryClient.getQueryData<IPublication[]>([
        "collection",
        String(collectionId),
      ]);
      const previousOverrides = queryClient.getQueryData<Record<number, boolean>>([
        "saved-post-overrides",
      ]);

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
      queryClient.setQueryData<IPublication[]>(["collection", String(collectionId)], (items) => {
        if (!items) return items;
        return isCollected ? items.filter((item) => item.id !== publicationId) : items;
      });
      queryClient.setQueryData<Record<number, boolean>>(["saved-post-overrides"], (current) => ({
        ...(current ?? {}),
        [publicationId]: nextIsCollected,
      }));

      return { previousQueries, previousCollection, previousOverrides, collectionId };
    },
    onError: (_error, _variables, context) => {
      context?.previousQueries?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
      if (context?.previousOverrides !== undefined) {
        queryClient.setQueryData(["saved-post-overrides"], context.previousOverrides);
      }
      if (context?.previousCollection) {
        queryClient.setQueryData(
          ["collection", String(context.collectionId)],
          context.previousCollection
        );
      }
    },
  });
}
