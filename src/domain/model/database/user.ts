import { OAuthTypeEnum } from '@domain/common/enums/user/oauth-type.enum';
import { UserStatusEnum } from '@domain/common/enums/user/user-status.enum';
import { DeviceModel } from './device';
import { ProfileModel } from './profile';
import { PickType } from '@nestjs/mapped-types';

export class UserModel {
  id: number;

  status: UserStatusEnum;

  oauth_type: OAuthTypeEnum;

  oauth_user_id: string;

  last_login_at: Date | null;

  push_agree: boolean;

  withdraw: boolean;

  withdrew_at: Date;

  created_at: Date;
  updated_at: Date;

  profile: ProfileModel;
  device: DeviceModel;
}

export class CreateUserModel extends PickType(UserModel, [
  'oauth_type',
  'oauth_user_id',
  'profile',
  'device',
] as const) {}
