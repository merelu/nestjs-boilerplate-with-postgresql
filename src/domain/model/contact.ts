import {
  BudgetScaleEnum,
  ContactableTimeEnum,
  DesignTypeEnum,
  DevelopPeriodEnum,
  ProjectScaleEnum,
  ServicePlatformEnum,
  ServiceTypeEnum,
} from '@domain/common/enums';

export class ContactM {
  id: string;

  service_platform: ServicePlatformEnum;

  service_type: ServiceTypeEnum;

  project_scale: ProjectScaleEnum;

  budget_scale: BudgetScaleEnum;

  design_type: DesignTypeEnum;

  develop_period: DevelopPeriodEnum;

  contactable_time: ContactableTimeEnum;

  reservation_date: Date;

  name: string;

  phone: string;

  email: string;

  company: string;

  etc: string;

  is_read: boolean;

  created_at: Date;

  updated_at: Date;
}
