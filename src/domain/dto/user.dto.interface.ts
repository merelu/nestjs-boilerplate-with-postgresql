export interface ISignupDto {
  readonly email: string;

  readonly password: string;

  readonly device_token?: string;
}
