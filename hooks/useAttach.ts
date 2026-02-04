import { getAttachById } from "@/lib/profile";
import { useQuery } from "@tanstack/react-query";

export const useAttachById = (id?: number) => {
  return useQuery({
    queryKey: ["attach", id ?? "none"],
    enabled: typeof id === "number" && !Number.isNaN(id),
    queryFn: async () => {
      if (typeof id !== "number" || Number.isNaN(id)) {
        throw new Error("attach id is required");
      }
      return getAttachById(id);
    },
  });
};

export default useAttachById;
