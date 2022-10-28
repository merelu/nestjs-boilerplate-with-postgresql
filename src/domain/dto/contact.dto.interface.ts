import {
  BudgetScaleEnum,
  ContactableTimeEnum,
  DesignTypeEnum,
  DevelopPeriodEnum,
  ProjectScaleEnum,
  ServicePlatformEnum,
  ServiceTypeEnum,
} from '@domain/common/enums';

export interface IAddContactDto {
  readonly name: string;

  readonly phone: string;

  readonly email: string;

  readonly company: string;

  readonly etc: string;

  readonly service_platform: ServicePlatformEnum;

  readonly service_type: ServiceTypeEnum;

  readonly project_scale: ProjectScaleEnum;

  readonly design_type: DesignTypeEnum;

  readonly budget_scale: BudgetScaleEnum;

  readonly develop_period: DevelopPeriodEnum;

  readonly contactable_time: ContactableTimeEnum;

  readonly reservation_date: Date;
}
