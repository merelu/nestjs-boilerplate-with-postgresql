import { MongooseConfigModule } from '@infrastructure/config/mongoose-config/mongoose-config.module';
import {
  Contact,
  ContactSchema,
} from '@infrastructure/entities/contact.entity';
import { User, UserSchema } from '@infrastructure/entities/user.entity';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseContactRepository } from './contact.repository';
import { DatabaseUserRepository } from './user.repository';

@Module({
  imports: [
    MongooseConfigModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Contact.name, schema: ContactSchema },
    ]),
  ],
  providers: [DatabaseUserRepository, DatabaseContactRepository],
  exports: [DatabaseUserRepository, DatabaseContactRepository],
})
export class RepositoriesModule {}
