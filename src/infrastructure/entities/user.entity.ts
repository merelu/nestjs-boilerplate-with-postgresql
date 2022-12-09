import { OAuthTypeEnum } from '@domain/common/enums/user/oauth-type.enum';
import { UserStatusEnum } from '@domain/common/enums/user/user-status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Device } from './device.entity';
import { Profile } from './profile.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    default: UserStatusEnum.active,
  })
  status: UserStatusEnum;

  @Column({ type: 'enum', enum: OAuthTypeEnum })
  oauth_type: OAuthTypeEnum;

  @Column({ type: 'varchar' })
  oauth_user_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_login_at: Date | null;

  @Column({ type: 'boolean', default: true })
  push_agree: boolean;

  @Column({ type: 'boolean', default: false })
  withdraw: boolean;

  @Column({ type: 'timestamp', nullable: true })
  withdrew_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Profile, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @OneToOne(() => Device, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'device_id' })
  device: Device;
}
