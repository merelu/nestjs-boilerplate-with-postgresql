import { DevicePlatformEnum } from '@domain/common/enums/device-platform';
import { OAuthTypeEnum } from '@domain/common/enums/user/oauth-type.enum';
import { OAuthPayload, OAuthProfile } from '@domain/model/common/oauth-payload';
import { CreateDeviceModel, DeviceModel } from '@domain/model/database/device';
import { CreateProfileModel } from '@domain/model/database/profile';
import { CreateUserModel, UserModel } from '@domain/model/database/user';
import { IDeviceRepository } from '@domain/repositories/device.repository.interface';
import { IProfileRepository } from '@domain/repositories/profile.repository.interface';
import { IUserRepository } from '@domain/repositories/user.repository.interface';
import { EntityManager } from 'typeorm';

export class CreateUserUseCases {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly deviceRepository: IDeviceRepository,
    private readonly profileRepository: IProfileRepository,
  ) {}

  async execute(
    data: OAuthPayload,
    deviceToken: string,
    platform: DevicePlatformEnum,
    conn?: EntityManager,
  ): Promise<UserModel> {
    const newDevice = await this.createDevice(deviceToken, platform, conn);

    const newProfile = await this.createProfile(data.profile, conn);

    const newUser = new CreateUserModel();

    newUser.oauth_type = data.oauth_type;
    newUser.oauth_user_id = data.id;
    newUser.profile = newProfile;
    newUser.device = newDevice;

    const result = await this.userRepository.create(newUser, conn);

    return result;
  }

  async checkMachedOAuthUser(providerId: string, provider: OAuthTypeEnum) {
    return await this.userRepository.findUserByOAuthPayload(
      provider,
      providerId,
    );
  }

  private async createDevice(
    deviceToken: string,
    platform: DevicePlatformEnum,
    conn?: EntityManager,
  ): Promise<DeviceModel> {
    const newDevice = new CreateDeviceModel();
    newDevice.device_token = deviceToken;
    newDevice.platform = platform;

    return await this.deviceRepository.create(newDevice, conn);
  }

  private async createProfile(data: OAuthProfile, conn?: EntityManager) {
    const newProfile = new CreateProfileModel();
    newProfile.name = data.name;
    newProfile.email = data.email;
    newProfile.gender = data.gender_type;
    newProfile.birthday = data.birthday;
    newProfile.profile_img_url = data.profile_image_url;

    return await this.profileRepository.create(newProfile, conn);
  }
}
