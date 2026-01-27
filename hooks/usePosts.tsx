import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCollectionById, getPosts } from "@/lib/profile";
import { adaptPostToPublication } from "@/app/adapters/publicationAdapters";

export const usePosts = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const [postsData, savedData] = await Promise.all([getPosts(), getCollectionById(1)]);
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
