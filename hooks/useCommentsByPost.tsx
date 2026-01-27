import { useQuery } from "@tanstack/react-query";
import { getCommentsByPost } from "@/lib/profile";
import { adaptCommentToComment } from "@/app/adapters/commentAdapters";

export const useCommentsByPost = (postId?: number) => {
  return useQuery({
    queryKey: ["post-comments", postId],
    queryFn: async () => {
      const data = await getCommentsByPost(postId!);
      const items = Array.isArray(data) ? data : data?.content ?? [];
      return items.map(adaptCommentToComment);
    },
    enabled: !!postId,
  });
};

export default useCommentsByPost;
