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
    const response = await profileApi.post(
      `/posts/images/upload-multiple/${postId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
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
