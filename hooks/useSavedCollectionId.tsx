import { getCollections } from "@/lib/profile";
import { useQuery } from "@tanstack/react-query";

const normalizeName = (value?: string) => value?.trim().toLowerCase();

const isSavedCollection = (item: any) => {
  const name = normalizeName(item?.name);
  return name === "salvos";
};

export const useSavedCollectionId = () => {
  return useQuery({
    queryKey: ["saved-collection-id"],
    queryFn: async () => {
      const data = await getCollections();
      const items = Array.isArray(data) ? data : [];
      const savedCollection = items.find(isSavedCollection);
      return savedCollection?.id ?? null;
    },
  });
};

export default useSavedCollectionId;
