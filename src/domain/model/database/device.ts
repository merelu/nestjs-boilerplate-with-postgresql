import { DevicePlatformEnum } from '@domain/common/enums/device-platform';
import { PickType } from '@nestjs/mapped-types';
import { UserModel } from './user';

export class DeviceModel {
  id: number;

  device_token: string | null;

  device_token_timestamp: Date | null;

  platform: DevicePlatformEnum;

  created_at: Date;

  updated_at: Date;
}

export class CreateDeviceModel extends PickType(DeviceModel, [
  'device_token',
  'platform',
] as const) {}
