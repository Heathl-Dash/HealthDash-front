import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile, profileForm } from "@/lib/axios";

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: profileForm) => updateProfile(data),
    onSuccess: () => {
      console.log("Perfil atualizado com sucesso");
      queryClient.invalidateQueries(["profile"]); 
    },
    onError: (error) => {
      console.error("Erro ao atualizar perfil:", error);
    },
  });
};

export default useUpdateUserProfile;
