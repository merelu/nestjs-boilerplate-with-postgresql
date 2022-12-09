import { TypeOrmConfigModule } from '@infrastructure/config/typeorm/typeorm.module';
import { Device } from '@infrastructure/entities/device.entity';
import { Profile } from '@infrastructure/entities/profile.entity';
import { User } from '@infrastructure/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseDeviceRepository } from './device.repository';
import { DatabaseProfileRepository } from './profile.repository';
import { DatabaseUserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([User, Device, Profile]),
  ],
  providers: [
    DatabaseUserRepository,
    DatabaseDeviceRepository,
    DatabaseProfileRepository,
  ],
  exports: [
    DatabaseUserRepository,
    DatabaseDeviceRepository,
    DatabaseProfileRepository,
  ],
})
export class RepositoriesModule {}
