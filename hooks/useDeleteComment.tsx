import { deleteComment } from "@/lib/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useDeleteComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteComment(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post-comments", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["profile-posts"] });
      Toast.show({type: "success", text1: "Comentário deletado com sucesso"});
    },
    onError: () => {
      Toast.show({type: "error", text1: "Não foi possível apagar o comentário"});
    }
  });
};

export default useDeleteComment;
