import {
  BudgetScaleEnum,
  ContactableTimeEnum,
  DesignTypeEnum,
  DevelopPeriodEnum,
  ProjectScaleEnum,
  ServicePlatformEnum,
  ServiceTypeEnum,
} from '@domain/common/enums';
import { ContactM } from '@domain/model/contact';
import { ApiProperty } from '@nestjs/swagger';

export class ContactPresenter {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  company: string;

  @ApiProperty()
  service_platform: ServicePlatformEnum;

  @ApiProperty()
  service_type: ServiceTypeEnum;

  @ApiProperty()
  project_scale: ProjectScaleEnum;

  @ApiProperty()
  budget_scale: BudgetScaleEnum;

  @ApiProperty()
  design_type: DesignTypeEnum;

  @ApiProperty()
  develop_period: DevelopPeriodEnum;

  @ApiProperty()
  contactable_time: ContactableTimeEnum;

  @ApiProperty()
  reservation_date: Date;

  @ApiProperty()
  etc: string;

  @ApiProperty()
  created_at: Date;

  constructor(contact: ContactM) {
    this.id = contact.id;
    this.name = contact.name;
    this.phone = contact.phone;
    this.email = contact.email;
    this.company = contact.company;
    this.service_platform = contact.service_platform;
    this.service_type = contact.service_type;
    this.project_scale = contact.project_scale;
    this.design_type = contact.design_type;
    this.develop_period = contact.develop_period;
    this.contactable_time = contact.contactable_time;
    this.reservation_date = contact.reservation_date;
    this.etc = contact.etc;
    this.created_at = contact.created_at;
  }
}
