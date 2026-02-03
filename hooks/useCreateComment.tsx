import { createComment } from "@/lib/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useCreateComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { content: string }) => createComment(postId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post-comments", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["profile-posts"] });
    },
    onError: () => {
      Toast.show({type:"error", text1:"Não foi possível comentar na publicação"})
    }
  });
};

export default useCreateComment;
