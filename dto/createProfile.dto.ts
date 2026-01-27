export interface CreateProfileDTO {
  socialName: string
  birthDate: string;
  gender: "FEMININO" | "MASCULINO";
  height: number;
  weight: number;
}