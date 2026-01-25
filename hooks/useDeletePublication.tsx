import { deletePublication } from "@/lib/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletePublication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePublication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["profile-posts"] });
      queryClient.refetchQueries({ queryKey: ["posts"], type: "all" });
      queryClient.refetchQueries({ queryKey: ["profile-posts"], type: "all" });
    },
  });
};

export default useDeletePublication;
