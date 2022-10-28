import { UserWithoutPassword } from '@domain/model/user';
import { ApiProperty } from '@nestjs/swagger';

export class UserPresenter {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  last_login: Date;

  @ApiProperty()
  created_at: Date;

  constructor(user: UserWithoutPassword) {
    this.id = user.id;
    this.email = user.email;
    this.last_login = user.last_login;
    this.created_at = user.created_at;
  }
}
