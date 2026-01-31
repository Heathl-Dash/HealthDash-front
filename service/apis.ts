import { createApi } from "./http";

const PROFILE = process.env.EXPO_PUBLIC_PROFILE_PATH;
const NUTRI = process.env.EXPO_PUBLIC_NUTRI_PATH;
const FIT = process.env.EXPO_PUBLIC_FIT_PATH;

export const nutriApi = createApi(`${NUTRI}/api/v1/`);
export const fitApi = createApi(`${FIT}/api/v1/`);
export const profileApi = createApi(`${PROFILE}/api/`);
