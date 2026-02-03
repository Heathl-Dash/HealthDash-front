import { updatePublication } from "@/lib/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

type UpdatePublicationInput = {
  id: number;
  description: string;
};

export const useUpdatePublication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, description }: UpdatePublicationInput) => {
      const normalizedDescription = description.trim();
      const safeDescription = normalizedDescription.length > 0 ? normalizedDescription : " ";
      return updatePublication(id, {
        description: safeDescription,
        title: normalizedDescription.length > 0 ? normalizedDescription : "Sem titulo",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["profile-posts"] });
      queryClient.refetchQueries({ queryKey: ["posts"], type: "all" });
      queryClient.refetchQueries({ queryKey: ["profile-posts"], type: "all" });
      Toast.show({type:"success", text1:"Publicação atualizada com sucesso"})
    },
    onError: () => {
      Toast.show({type:"error", text1:"Não foi possível atualizar a publicação"})
    }
  });
};

export default useUpdatePublication;
