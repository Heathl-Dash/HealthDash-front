import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCollectionById, getPosts } from "@/lib/profile";
import { adaptPostToPublication } from "@/app/adapters/publicationAdapters";
import useSavedCollectionId from "@/hooks/useSavedCollectionId";

export const usePosts = () => {
  const queryClient = useQueryClient();
  const { data: savedCollectionId } = useSavedCollectionId();

  return useQuery({
    queryKey: ["posts", savedCollectionId ?? "none"],
    queryFn: async () => {
      const [postsData, savedData] = await Promise.all([
        getPosts(),
        savedCollectionId != null ? getCollectionById(savedCollectionId) : Promise.resolve([]),
      ]);
      const overrides =
        queryClient.getQueryData<Record<number, boolean>>(["saved-post-overrides"]) ?? {};
      const savedItems = Array.isArray(savedData) ? savedData : savedData?.content ?? [];
      const savedIds = new Set(savedItems.map((item: any) => item.id));

      return postsData.content.map((post: any) => {
        const publication = adaptPostToPublication(post);
        const isCollectedFromApi = publication.isCollected ?? false;
        const isCollected =
          publication.id in overrides
            ? overrides[publication.id]
            : isCollectedFromApi || savedIds.has(publication.id);

        return {
          ...publication,
          isCollected,
        };
      });
    },
  });
};

export default usePosts;
