import { ProfileForm } from "@/dto/profile.dto";
import { profileApi } from "@/service/apis";

export type IProfileIMC = Pick<IProfile, "calc_IMC" | "imc_classification">;

export const getProfile = () => {
  return profileApi
    .get(`profiles/retrieveprofile/`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao receber perfil: ", err);
      throw err;
    });
};

export const getProfileIMC = async (): Promise<IProfileIMC | null> => {
  try {
    const { data } = await profileApi.get<IProfile>("profiles/retrieveprofile/");
    return {
      calc_IMC: data.calc_IMC,
      imc_classification: data.imc_classification,
    };
  } catch (error: any) {
    console.error("Erro ao pegar imc:", error);
    return null;
  }
};

export const updateProfile = async (data: ProfileForm) => {
  return profileApi
    .patch(`profiles/updateprofile/`, data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao atualizar o perfil: ", err);
      throw err;
    });
};

export const googleLogin = (googleToken: string) => {
  return profileApi
    .post(`profiles/googlelogin/`, { token: googleToken })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao buscar token do google: ", err);
      throw err;
    });
};
