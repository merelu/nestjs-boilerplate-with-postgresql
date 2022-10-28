export interface IAuthLoginDto {
  readonly email: string;
  readonly password: string;
}

export interface IRefreshTokenDto {
  readonly refresh_token: string;
}
