import { GenderTypeEnum } from '@domain/common/enums/user/gender-type.enum';
import { User } from '@infrastructure/entities/user.entity';
import { PickType } from '@nestjs/mapped-types';

export class ProfileModel {
  id: number;

  name: string;

  mobile: string;

  email: string;

  gender: GenderTypeEnum;

  birthday: string | null;

  profile_img_key: string | null;

  profile_img_url: string | null;

  created_at: Date;
  updated_at: Date;
}

export class CreateProfileModel extends PickType(ProfileModel, [
  'name',
  'email',
  'gender',
  'birthday',
  'profile_img_url',
] as const) {}
