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

    onSuccess: (_data, { collectionId }) => {
      // coleção afetada
      queryClient.invalidateQueries({
        queryKey: ["collection", String(collectionId)],
      });

      // listas gerais de posts
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      // posts do perfil (se existir)
      queryClient.invalidateQueries({
        queryKey: ["profile-posts"],
      });
    },
  });
}
