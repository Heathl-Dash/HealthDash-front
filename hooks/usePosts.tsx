import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/lib/profile";
import { adaptPostToPublication } from "@/app/adapters/publicationAdapters";

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const data = await getPosts();
      return data.content.map(adaptPostToPublication);
    },
  });
};

export default usePosts;
