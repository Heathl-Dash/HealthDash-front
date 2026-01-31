import { getProfile } from "@/lib/profile";
import { useQuery } from "@tanstack/react-query";

export const useProfile = (enabled = true) => {
  const {
    data: profile,
    error: profileErro,
    isLoading: profileLoading,
  } = useQuery({ queryKey: ["profile"], queryFn: getProfile, enabled });

  return {
    profile,
    profileErro,
    profileLoading,
  };
};

export default useProfile;
