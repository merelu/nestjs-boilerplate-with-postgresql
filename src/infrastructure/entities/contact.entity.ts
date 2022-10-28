import {
  BudgetScaleEnum,
  ContactableTimeEnum,
  DesignTypeEnum,
  DevelopPeriodEnum,
  ProjectScaleEnum,
  ServicePlatformEnum,
  ServiceTypeEnum,
} from '@domain/common/enums';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CustomSchemaOptions } from './custom.schema.option';

export type ContactDocument = Contact & Document;

@Schema(CustomSchemaOptions)
export class Contact {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  phone: string;

  @Prop({
    type: String,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  company: string;

  @Prop({
    type: String,
    default: null,
  })
  etc: string;

  @Prop({
    type: Number,
    enum: ServicePlatformEnum,
    default: ServicePlatformEnum.TBD,
  })
  service_platform: ServicePlatformEnum;

  @Prop({
    type: Number,
    enum: ServiceTypeEnum,
    default: ServiceTypeEnum.TBD,
  })
  service_type: ServiceTypeEnum;

  @Prop({
    type: Number,
    enum: ProjectScaleEnum,
    default: ProjectScaleEnum.TBD,
  })
  project_scale: ProjectScaleEnum;

  @Prop({
    type: Number,
    enum: DesignTypeEnum,
    default: DesignTypeEnum.TBD,
  })
  design_type: DesignTypeEnum;

  @Prop({
    type: Number,
    enum: BudgetScaleEnum,
    default: BudgetScaleEnum.TBD,
  })
  budget_scale: BudgetScaleEnum;

  @Prop({
    type: Number,
    enum: DevelopPeriodEnum,
    default: DevelopPeriodEnum.TBD,
  })
  develop_period: DevelopPeriodEnum;

  @Prop({
    type: Number,
    enum: ContactableTimeEnum,
    default: ContactableTimeEnum.TBD,
  })
  contactable_time: ContactableTimeEnum;

  @Prop({
    type: Date,
    default: null,
  })
  reservation_date: Date;

  @Prop({
    type: Boolean,
    default: false,
  })
  is_read: boolean;

  readonly created_at: Date;
  readonly updated_at: Date;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
