import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProfile } from "@/lib/profile"; 
import { PhysicalProfileDTO } from "@/dto/PhysicalProfile.dto";

export function useCreatePhysicalProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PhysicalProfileDTO) => createProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["profile-imc"] });
    },
  });
}
