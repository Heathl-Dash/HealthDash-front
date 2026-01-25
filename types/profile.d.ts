declare interface IProfile {
  id: number;
  socialName: string;
  email?: string;
  weight?: number;
  height?: number;
  age?: number;
  imc: number;
  imcDescription: string;
  bio?: string;
  avatarUrl: string | null;
  followingNumber?: number | null;
  followersNumber?: number | null;
}
