import { UpdateProfileDTO } from "@/dto/createProfile.dto";
import { updateProfile } from "@/lib/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export function useUpdateProfile() {
  const queryClient = useQueryClient();


  return useMutation({
    mutationFn: (data: UpdateProfileDTO) => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["profile-imc"] });
      Toast.show({ type: "success", text1: "Perfil atualizado com sucesso" });
    },
    onError: () => {
      Toast.show({ type: "error", text1: "Não foi possível atualizar o perfil" });
    },
  });
}
