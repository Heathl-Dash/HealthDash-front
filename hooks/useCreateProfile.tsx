import {CreateProfileDTO} from "@/dto/createProfile.dto";
import { createProfile } from "@/lib/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProfileDTO) => createProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["profile-imc"] });
    },
  });
}
