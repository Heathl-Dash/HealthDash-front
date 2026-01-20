import { profileForm, updateProfile } from "@/lib/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: profileForm) => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (error) => {
      console.error("Erro ao atualizar perfil:", error);
    },
  });
};

export default useUpdateUserProfile;
