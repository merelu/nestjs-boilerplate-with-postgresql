import {
  ServicePlatformEnum,
  ServiceTypeEnum,
  ProjectScaleEnum,
  DesignTypeEnum,
  BudgetScaleEnum,
  DevelopPeriodEnum,
  ContactableTimeEnum,
} from '@domain/common/enums';
import { IAddContactDto } from '@domain/dto/contact.dto.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddContactDto implements IAddContactDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  company: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  etc: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(ServicePlatformEnum)
  @IsNumber()
  service_platform: ServicePlatformEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(ServiceTypeEnum)
  @IsNumber()
  service_type: ServiceTypeEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(ProjectScaleEnum)
  @IsNumber()
  project_scale: ProjectScaleEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(DesignTypeEnum)
  @IsNumber()
  design_type: DesignTypeEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(BudgetScaleEnum)
  @IsNumber()
  budget_scale: BudgetScaleEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(DevelopPeriodEnum)
  @IsNumber()
  develop_period: DevelopPeriodEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(ContactableTimeEnum)
  @IsNumber()
  contactable_time: ContactableTimeEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  reservation_date: Date;
}
