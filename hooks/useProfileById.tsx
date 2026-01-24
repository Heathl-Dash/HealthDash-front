import { getProfileById } from "@/lib/profile";
import { useQuery } from "@tanstack/react-query";

export const useProfileById = (profileId?: number) => {
  const {
    data: profile,
    error: profileErro,
    isLoading: profileLoading,
  } = useQuery({
    queryKey: ["profile", profileId],
    queryFn: () => getProfileById(profileId!),
    enabled: !!profileId,
  });

  return {
    profile,
    profileErro,
    profileLoading,
  };
};

export default useProfileById;
