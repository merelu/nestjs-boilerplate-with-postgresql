import { EnvironmentConfigModule } from '@infrastructure/config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '@infrastructure/config/environment-config/environment-config.service';
import { ExceptionsModule } from '@infrastructure/exceptions/exceptions.module';
import { LoggerModule } from '@infrastructure/logger/logger.module';
import { LoggerService } from '@infrastructure/logger/logger.service';
import { DatabaseContactRepository } from '@infrastructure/repositories/contact.repository';
import { RepositoriesModule } from '@infrastructure/repositories/repositories.module';
import { DatabaseUserRepository } from '@infrastructure/repositories/user.repository';
import { BcryptServiceModule } from '@infrastructure/services/bcrypt/bcrypt.module';
import { BcryptService } from '@infrastructure/services/bcrypt/bcrypt.service';
import { JwtServiceModule } from '@infrastructure/services/jwt/jwt.module';
import { JwtTokenService } from '@infrastructure/services/jwt/jwt.service';
import { UuidModule } from '@infrastructure/services/uuid/uuid.module';
import { UuidService } from '@infrastructure/services/uuid/uuid.service';
import { DynamicModule, Module } from '@nestjs/common';
import { LoginUseCases } from 'src/usecases/auth/login.usecases';
import { LogoutUseCases } from 'src/usecases/auth/logout.usecases';
import { AddContactUseCases } from 'src/usecases/contact/addContact.usecases';
import { GetContactUseCases } from 'src/usecases/contact/getContact.usecases';
import { GetContactsUseCases } from 'src/usecases/contact/getContacts.usecases';
import { GetUserUseCases } from 'src/usecases/user/get.user.usecases';
import { SignupUseCases } from 'src/usecases/user/signup.usecases';
import { UseCaseProxy } from './usercases-proxy';

@Module({
  imports: [
    LoggerModule,
    JwtServiceModule,
    BcryptServiceModule,
    UuidModule,
    EnvironmentConfigModule,
    RepositoriesModule,
    ExceptionsModule,
  ],
})
export class UseCasesProxyModule {
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';
  static SIGNUP_USECASES_PROXY = 'SignupUseCasesProxy';
  static GET_USER_USECASES_PROXY = 'GetUserUseCasesProxy';
  static ADD_CONTACT_USECASES_PROXY = 'AddContactUseCasesProxy';
  static GET_CONTACT_USECASES_PROXY = 'GetContactUseCasesProxy';
  static GET_CONTACTS_USECASES_PROXY = 'GetContactsUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        {
          inject: [
            LoggerService,
            JwtTokenService,
            EnvironmentConfigService,
            DatabaseUserRepository,
            BcryptService,
            UuidService,
          ],
          provide: UseCasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
            uuidService: UuidService,
          ) =>
            new UseCaseProxy(
              new LoginUseCases(
                logger,
                jwtTokenService,
                config,
                userRepo,
                bcryptService,
                uuidService,
              ),
            ),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UseCasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: (userRepo: DatabaseUserRepository) =>
            new UseCaseProxy(new LogoutUseCases(userRepo)),
        },
        {
          inject: [LoggerService, DatabaseUserRepository, BcryptService],
          provide: UseCasesProxyModule.SIGNUP_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new SignupUseCases(logger, userRepo, bcryptService),
            ),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UseCasesProxyModule.GET_USER_USECASES_PROXY,
          useFactory: (userRepo: DatabaseUserRepository) =>
            new UseCaseProxy(new GetUserUseCases(userRepo)),
        },
        {
          inject: [LoggerService, DatabaseContactRepository],
          provide: UseCasesProxyModule.ADD_CONTACT_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            contactRepo: DatabaseContactRepository,
          ) => new UseCaseProxy(new AddContactUseCases(logger, contactRepo)),
        },
        {
          inject: [DatabaseContactRepository],
          provide: UseCasesProxyModule.GET_CONTACT_USECASES_PROXY,
          useFactory: (contactRepo: DatabaseContactRepository) =>
            new UseCaseProxy(new GetContactUseCases(contactRepo)),
        },
        {
          inject: [DatabaseContactRepository],
          provide: UseCasesProxyModule.GET_CONTACTS_USECASES_PROXY,
          useFactory: (contactRepo: DatabaseContactRepository) =>
            new UseCaseProxy(new GetContactsUseCases(contactRepo)),
        },
      ],
      exports: [
        UseCasesProxyModule.LOGIN_USECASES_PROXY,
        UseCasesProxyModule.LOGOUT_USECASES_PROXY,
        UseCasesProxyModule.SIGNUP_USECASES_PROXY,
        UseCasesProxyModule.GET_USER_USECASES_PROXY,
        UseCasesProxyModule.ADD_CONTACT_USECASES_PROXY,
        UseCasesProxyModule.GET_CONTACT_USECASES_PROXY,
        UseCasesProxyModule.GET_CONTACTS_USECASES_PROXY,
      ],
    };
  }
}
