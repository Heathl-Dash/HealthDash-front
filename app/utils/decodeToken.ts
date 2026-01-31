import { jwtDecode } from "jwt-decode";

export interface KeycloakTokenPayload {
  name?: string;
  given_name?: string;
  family_name?: string;
  preferred_username?: string;
  email?: string;
  picture?: string;
}

export function decodeToken(token: string): KeycloakTokenPayload {
  return jwtDecode<KeycloakTokenPayload>(token);
}
