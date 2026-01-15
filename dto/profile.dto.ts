export type ProfileForm = Omit<
  IProfile,
  "calc_IMC" | "imc_classification" | "imc_degree" | "id" | "email"
>;