import {CreateProfileDTO} from "@/dto/createProfile.dto";
import { createProfile } from "@/lib/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export function useCreateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProfileDTO) => createProfile(data),
    onSuccess: () => {
      // Drop stale onboarding status so the tabs screen doesn't immediately redirect back.
      queryClient.removeQueries({ queryKey: ["profile"] });
      queryClient.removeQueries({ queryKey: ["profile-imc"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["profile-imc"] });
    },
    onError: () => {
      Toast.show({ type: "error", text1:"Não foi possível criar o perfil"});
    }
  });
}
