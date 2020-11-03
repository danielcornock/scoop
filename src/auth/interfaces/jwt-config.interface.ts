export interface IJwtConfig {
  payload: { id: string; email: string; name: string; isAdmin?: boolean };
  secret: string;
  expiresIn?: number | string;
}

export interface IDecodedJwt {
  exp: number;
  iat: number;
  id: string;
  [key: string]: unknown;
}
