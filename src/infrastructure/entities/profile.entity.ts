import { GenderTypeEnum } from '@domain/common/enums/user/gender-type.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  mobile: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({
    type: 'enum',
    enum: GenderTypeEnum,
    default: GenderTypeEnum.unspecified,
  })
  gender: GenderTypeEnum;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  birthday: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  profile_img_key: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  profile_img_url: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
