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

export const getPostsByprofile = (id:number) => {
  return profileApi
    .get(`/posts/profile/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao receber perfil: ", err);
      throw err;
    });
};
