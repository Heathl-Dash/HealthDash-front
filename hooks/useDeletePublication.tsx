import { deletePublication } from "@/lib/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useDeletePublication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePublication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["profile-posts"] });
      queryClient.refetchQueries({ queryKey: ["posts"], type: "all" });
      queryClient.refetchQueries({ queryKey: ["profile-posts"], type: "all" });
      Toast.show({type:"success", text1:"Publicação deletada com sucesso"})
    },
    onError: () => {
      Toast.show({type:"error", text1:"Não foi possível deletar a Publicação"})
    }
  });
};

export default useDeletePublication;
