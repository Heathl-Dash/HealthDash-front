export type Gender = "FEMININO" | "MASCULINO" | "OUTRO";

export interface CreateProfileDTO {
  socialName: string;
  birthDate: string;
  gender: Gender;
  height: number;
  weight: number;
}

export interface UpdateProfileDTO {
  birthDate: string;
  bio: string;
  socialName: string;
  height: number;
  weight: number;
  gender: Gender;
}

export interface ProfileFormDTO {
  name: string;
  weigth: string;
  heigth: string;
  age: number;
}
