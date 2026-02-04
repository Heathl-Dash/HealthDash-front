import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProfile } from "@/lib/profile";

export const useDeleteProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProfile(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
    onError: (error) => {
      console.error("Erro ao deletar perfil:", error);
    },
  });
};
