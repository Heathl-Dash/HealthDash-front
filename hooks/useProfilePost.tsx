import { useQuery } from "@tanstack/react-query";
import { getPostsByprofile } from "@/lib/profile";
import { adaptPostToPublication } from "@/app/adapters/publicationAdapters"; 

export const useProfilePosts = (profileId?: number) => {
  return useQuery({
    queryKey: ["profile-posts", profileId],
    queryFn: async () => {
      const data = await getPostsByprofile(profileId!);
      return data.content.map(adaptPostToPublication);
    },
    enabled: !!profileId,
  });
};
