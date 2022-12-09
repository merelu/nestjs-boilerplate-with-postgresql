import { OAuthTypeEnum } from '@domain/common/enums/user/oauth-type.enum';
import { UserStatusEnum } from '@domain/common/enums/user/user-status.enum';
import { UserModel } from '@domain/model/database/user';
import { ApiProperty } from '@nestjs/swagger';
import { DevicePresenter } from '../device/device.presenter';
import { ProfilePresenter } from '../profile/profile.presenter';

export class UserPresenter {
  @ApiProperty()
  id: number;

  @ApiProperty()
  status: UserStatusEnum;

  @ApiProperty()
  oauth_type: OAuthTypeEnum;

  @ApiProperty()
  oauth_user_id: string;

  @ApiProperty()
  last_login_at: Date | null;

  @ApiProperty()
  push_agree: boolean;

  @ApiProperty()
  withdraw: boolean;

  @ApiProperty()
  withdrew_at: Date;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  // @ApiProperty({ type: ProfilePresenter, nullable: true })
  // profile: ProfilePresenter | null;

  // @ApiProperty({ type: DevicePresenter, nullable: true })
  // device: DevicePresenter | null;

  constructor(data: UserModel) {
    this.id = data.id;
    this.status = data.status;
    this.oauth_type = data.oauth_type;
    this.oauth_user_id = data.oauth_user_id;
    this.last_login_at = data.last_login_at;
    this.push_agree = data.push_agree;
    this.withdraw = data.withdraw;
    this.withdrew_at = data.withdrew_at;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    // this.profile = data.profile ? new ProfilePresenter(data.profile) : null;
    // this.device = data.device ? new DevicePresenter(data.device) : null;
  }
}
