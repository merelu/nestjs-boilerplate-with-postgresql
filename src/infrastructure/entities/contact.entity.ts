import {
  BudgetScaleEnum,
  ContactableTimeEnum,
  DesignTypeEnum,
  DevelopPeriodEnum,
  ProjectScaleEnum,
  ServicePlatformEnum,
  ServiceTypeEnum,
} from '@domain/common/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 50 })
  phone: string;

  @Column('varchar', { length: 50 })
  email: string;

  @Column('varchar', { length: 50 })
  company: string;

  @Column('text')
  etc: string;

  @Column({ type: 'enum', enum: ServicePlatformEnum })
  service_platform: ServicePlatformEnum;

  @Column({ type: 'enum', enum: ServiceTypeEnum })
  service_type: ServiceTypeEnum;

  @Column({ type: 'enum', enum: ProjectScaleEnum })
  project_scale: ProjectScaleEnum;

  @Column({ type: 'enum', enum: DesignTypeEnum })
  design_type: DesignTypeEnum;

  @Column({ type: 'enum', enum: BudgetScaleEnum })
  budget_scale: BudgetScaleEnum;

  @Column({ type: 'enum', enum: DevelopPeriodEnum })
  develop_period: DevelopPeriodEnum;

  @Column({ type: 'enum', enum: ContactableTimeEnum })
  contactable_time: ContactableTimeEnum;

  @Column()
  reservation_date: Date;

  @Column('boolean', { default: false })
  is_read: boolean;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
