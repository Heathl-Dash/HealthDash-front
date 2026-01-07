declare interface IProfile {
  id: number;
  name: string;
  email: string;
  weigth?: string;
  heigth?: string;
  age?: number;
  calc_IMC: number;
  imc_classification: string;
  imc_degree: string;
  bio?: string
  avatar: string | null
  followingNumber: number,
  followersNumber: number
}
