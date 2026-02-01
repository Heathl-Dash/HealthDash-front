import { ProfileFormDTO } from "@/dto/createProfile.dto";
import { updateProfile } from "@/lib/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProfileFormDTO) => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (error) => {
      console.error("Erro ao atualizar perfil:", error);
      Toast.show({type:"error", text1:"Não foi possível atualizar o perfil"})
    },
  });
};

export default useUpdateUserProfile;
