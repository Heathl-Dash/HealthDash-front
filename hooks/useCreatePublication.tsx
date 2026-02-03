import { createPublication, uploadPublicationImages } from "@/lib/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

type CreatePublicationPayload = {
  title?: string;
  description: string;
  typeId: number;
  isPublic: boolean;
  attach?: IAttach | null;
};

type CreatePublicationInput = {
  payload: CreatePublicationPayload;
  images: string[];
};

type UseCreatePublicationOptions = {
  description: string;
  images: string[];
  attachDraft: IAttach | null;
  attachType: "habit" | "toDo" | null;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

const PUBLICATION_TYPE_ID = {
  normal: 1,
  toDo: 2,
  habit: 3,
};

export const useCreatePublication = ({
  description,
  images,
  attachDraft,
  attachType,
  onSuccess,
  onError,
}: UseCreatePublicationOptions) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ payload, images: imageList }: CreatePublicationInput) => {
      const created = await createPublication(payload);
      const postId = created?.id ?? created?.post?.id ?? created?.data?.id;

      if (!postId) {
        throw new Error("ID da publicação não retornado.");
      }

      if (imageList.length > 0) {
        await uploadPublicationImages(postId, imageList);
      }

      return created;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["profile-posts"] });
      queryClient.refetchQueries({ queryKey: ["posts"], type: "all" });
      queryClient.refetchQueries({ queryKey: ["profile-posts"], type: "all" });
    },
  });

  const handlePublish = async () => {
    if (!description.trim() && images.length === 0 && !attachDraft) {
      Alert.alert("Conteúdo vazio", "Adicione um texto, imagem ou anexo antes de publicar.");
      return;
    }

    try {
      const typeId = attachType ? PUBLICATION_TYPE_ID[attachType] : PUBLICATION_TYPE_ID.normal;
      const normalizedDescription = description.trim();
      const safeDescription = normalizedDescription.length > 0 ? normalizedDescription : " ";

      const payload: CreatePublicationPayload = {
        title: normalizedDescription.length > 0 ? normalizedDescription : "Sem titulo",
        description: safeDescription,
        typeId,
        isPublic: true,
        attach: attachDraft,
      };

      await mutation.mutateAsync({ payload, images });
      onSuccess?.();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível publicar agora. Tente novamente.");
      onError?.(error);
    }
  };

  return {
    handlePublish,
    isSaving: mutation.isPending,
  };
};

export default useCreatePublication;
