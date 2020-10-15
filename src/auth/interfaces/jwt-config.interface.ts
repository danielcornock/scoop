export interface IJwtConfig {
  payload: { id: string; email: string };
  secret: string;
  expiresIn?: number | string;
}

export interface IDecodedJwt {
  exp: string;
  iat: string;
  id: string;
  [key: string]: unknown;
}
