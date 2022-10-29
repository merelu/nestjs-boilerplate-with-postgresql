import { TypeOrmConfigModule } from '@infrastructure/config/typeorm/typeorm.module';
import { Contact } from '@infrastructure/entities/contact.entity';
import { User } from '@infrastructure/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseContactRepository } from './contact.repository';
import { DatabaseUserRepository } from './user.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([User, Contact])],
  providers: [DatabaseUserRepository, DatabaseContactRepository],
  exports: [DatabaseUserRepository, DatabaseContactRepository],
})
export class RepositoriesModule {}
