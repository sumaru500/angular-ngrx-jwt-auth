export interface AuthUser {
  id? : string;
  username?: string,
  email?: string,
  roles? : string[],
  accessToken?: string,
}
