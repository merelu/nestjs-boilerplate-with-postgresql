import { GenderTypeEnum } from '@domain/common/enums/user/gender-type.enum';
import { OAuthTypeEnum } from '@domain/common/enums/user/oauth-type.enum';

export class OAuthPayload {
  id: string;
  oauth_type: OAuthTypeEnum;
  profile: OAuthProfile;
}

export class OAuthProfile {
  email: string;
  gender_type: GenderTypeEnum;
  birthday: string | null;
  name: string;
  profile_image_url: string;
}
