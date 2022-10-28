export class UserWithoutPassword {
  id: string;
  email: string;
  refresh_token_hash: string;
  device_token: string;
  last_login: Date;
  created_at: Date;
  updated_at: Date;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
