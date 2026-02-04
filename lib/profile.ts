import { CreateProfileDTO, ProfileFormDTO, UpdateProfileDTO } from "@/dto/createProfile.dto";
import { profileApi } from "@/service/apis";

export type IProfileIMC = Pick<IProfile, "imc" | "imcDescription">;

export const getProfile = () => {
  return profileApi
    .get(`/profiles/me`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao receber perfil: ", err);
      throw err;
    });
};

export const getProfileById = (id: number) => {
  return profileApi
    .get(`/profiles/id/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao receber perfil por id: ", err);
      throw err;
    });
};

export const getProfileIMC = async (): Promise<IProfileIMC | null> => {
  try {
    const { data } = await profileApi.get<IProfile>("profiles/me");
    return {
      imc: data.imc,
      imcDescription: data.imcDescription,
    };
  } catch (error: any) {
    console.error("Erro ao pegar imc:", error);
    return null;
  }
};
//PUBLICATIONS:

export const getPosts = () => {
  return profileApi
    .get(`/posts`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao receber perfil: ", err);
      throw err;
    });
};

export const getPostsByprofile = (id: number) => {
  return profileApi
    .get(`/posts/profile/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao receber perfil: ", err);
      throw err;
    });
};

export const createProfile = (data: CreateProfileDTO) => {
  return profileApi
    .post(`/profiles/onboarding`, data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao criar perfil: ", err);
      throw err;
    });
};

export const updateProfile = (data: UpdateProfileDTO | ProfileFormDTO) => {
  return profileApi
    .patch(`/profiles`, data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao atualizar perfil: ", err);
      throw err;
    });
};

const getAvatarFileName = (uri: string) => {
  const lastPart = uri.split("/").pop();
  if (lastPart && lastPart.includes(".")) {
    return lastPart;
  }
  return `profile-avatar.jpg`;
};

const getAvatarFileType = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  if (extension === "png") return "image/png";
  return "image/jpeg";
};

export const uploadProfileAvatar = async (uri: string) => {
  const name = getAvatarFileName(uri);
  const type = getAvatarFileType(name);
  const formData = new FormData();
  formData.append("file", { uri, name, type } as any);

  try {
    const response = await profileApi.post(`/profiles/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    console.error("erro ao enviar avatar: ", err);
    console.error("detalhes do erro:", {
      status: (err as any)?.response?.status,
      data: (err as any)?.response?.data,
      headers: (err as any)?.response?.headers,
    });
    throw err;
  }
};

export const toggleLike = (id: number) => {
  return profileApi
    .patch(`/like/toggle_like/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao curtir publicação: ", err);
      throw err;
    });
};

export const createPublication = (data) => {
  return profileApi
    .post(`/posts`, data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao postar uma publicação: ", err);
      console.error("detalhes do erro:", {
        status: err?.response?.status,
        data: err?.response?.data,
        headers: err?.response?.headers,
      });
      throw err;
    });
};

const getImageName = (uri: string, index: number) => {
  const lastPart = uri.split("/").pop();
  if (lastPart && lastPart.includes(".")) {
    return lastPart;
  }
  return `publication-image-${index + 1}.jpg`;
};

const getImageType = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  if (extension === "png") return "image/png";
  if (extension === "webp") return "image/webp";
  return "image/jpeg";
};

export const uploadPublicationImages = async (postId: number, imageUris: string[]) => {
  if (!imageUris.length) return null;

  const formData = new FormData();
  imageUris.slice(0, 3).forEach((uri, index) => {
    const name = getImageName(uri, index);
    const type = getImageType(name);
    formData.append("files", { uri, name, type } as any);
  });

  try {
    const response = await profileApi.post(`/posts/images/upload-multiple/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    console.error("erro ao enviar imagens da publicação: ", err);
    console.error("detalhes do erro:", {
      status: (err as any)?.response?.status,
      data: (err as any)?.response?.data,
      headers: (err as any)?.response?.headers,
    });
    throw err;
  }
};

export const updatePublication = async (
  id: number,
  data: { description?: string; title?: string }
) => {
  try {
    const response = await profileApi.patch(`/posts/${id}`, data);
    return response.data;
  } catch (err: any) {
    const status = err?.response?.status;
    if (status === 405) {
      try {
        const response = await profileApi.put(`/posts/${id}`, data);
        return response.data;
      } catch (fallbackError) {
        console.error("erro ao editar publicação (PUT): ", fallbackError);
        throw fallbackError;
      }
    }
    console.error("erro ao editar publicação: ", err);
    throw err;
  }
};

export const deletePublication = (id: number) => {
  return profileApi
    .delete(`/posts/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao excluir publicação: ", err);
      throw err;
    });
};

// Comentarios
export const getCommentsByPost = (postId: number) => {
  return profileApi
    .get(`/posts/${postId}/comments`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao receber comentarios: ", err);
      throw err;
    });
};

export const createComment = (postId: number, data: { content: string }) => {
  return profileApi
    .post(`/posts/${postId}/comments`, data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao criar comentario: ", err);
      throw err;
    });
};

export const deleteComment = (postId: number, commentId: number) => {
  return profileApi
    .delete(`/posts/${postId}/comments/${commentId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao excluir comentario: ", err);
      throw err;
    });
};

//collections
export const getCollectionById = (id: number) => {
  return profileApi
    .get(`/collections/${id}/posts`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao receber coleção: ", err);
      throw err;
    });
};

export const addPostToCollection = (collectionId: number, postId: number) => {
  return profileApi
    .post(`/collections/${collectionId}/posts/${postId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao adicionar a publicação na coleção: ", err);
      throw err;
    });
};

export const deletePostToCollection = (collectionId: number, postId: number) => {
  return profileApi
    .delete(`/collections/${collectionId}/posts/${postId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao deletar a publicação na coleção: ", err);
      throw err;
    });
};

export const getCollections = () => {
  return profileApi
    .get(`/collections`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao receber coleções: ", err);
      throw err;
    });
};

// follows

export const getFollow = (userId: number) => {
  return profileApi
    .get(`/follow/status/${userId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao verificar se segue o perfil: ", err);
      throw err;
    });
};

export const setFollow = (userId: number) => {
  return profileApi
    .patch(`/follow/${userId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao seguir/deixar de seguir perfil: ", err);
      throw err;
    });
};

export const searchProfile = (search?: string) => {
  const url = search
    ? `profiles/search?search=${encodeURIComponent(search)}`
    : `profiles/search`;
  
  return profileApi
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao pesquisar pelo perfil: ", err);
      throw err;
    });
}
