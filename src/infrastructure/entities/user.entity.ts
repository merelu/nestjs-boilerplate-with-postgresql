import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Index({ unique: true })
  @Column('varchar', { length: 50, unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('varchar', { nullable: true })
  device_token: string;

  @Column('varchar', { nullable: true })
  refresh_token_hash: string;

  @Column({ nullable: true })
  last_login: Date;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
