import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/lib/profile";
import { adaptPostToPublication } from "@/app/adapters/publicationAdapters";

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const postsData = await getPosts();

      return postsData.content.map((post: any) =>
        adaptPostToPublication(post)
      );
    },
  });
};

export default usePosts;
