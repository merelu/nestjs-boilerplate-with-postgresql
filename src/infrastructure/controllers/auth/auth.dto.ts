import { DevicePlatformEnum } from '@domain/common/enums/device-platform';
import { PickType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
export class DeviceInfoDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  readonly device_token: string;

  @ApiProperty({ required: true })
  @Type(() => Number)
  @IsEnum(DevicePlatformEnum)
  @IsNotEmpty()
  readonly platform: DevicePlatformEnum;
}
export class OAuthLoginDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  readonly token: string;

  @ApiProperty({ required: true })
  @ValidateNested()
  @Type(() => DeviceInfoDto)
  readonly device_info: DeviceInfoDto;
}

export class AppleOAuthLoginDto extends PickType(OAuthLoginDto, [
  'device_info',
] as const) {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  readonly id_token: string;
}

export class RefreshTokenDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  readonly refresh_token: string;

  @ApiProperty({ required: true })
  @ValidateNested()
  @Type(() => DeviceInfoDto)
  @IsNotEmpty()
  readonly device_info: DeviceInfoDto;
}
