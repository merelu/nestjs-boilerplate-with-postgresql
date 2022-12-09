import { GenderTypeEnum } from '@domain/common/enums/user/gender-type.enum';
import { ProfileModel } from '@domain/model/database/profile';
import { ApiProperty } from '@nestjs/swagger';

export class ProfilePresenter {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  mobile: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  gender: GenderTypeEnum;

  @ApiProperty()
  birthday: string | null;

  @ApiProperty()
  profile_img_url: string | null;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  constructor(data: ProfileModel) {
    this.id = data.id;
    this.name = data.name;
    this.mobile = data.mobile;
    this.email = data.email;
    this.gender = data.gender;
    this.birthday = data.birthday;
    this.profile_img_url = data.profile_img_url;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }
}
