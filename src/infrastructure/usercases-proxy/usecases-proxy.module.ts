import { EnvironmentConfigModule } from '@infrastructure/config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '@infrastructure/config/environment-config/environment-config.service';
import { DatabaseDeviceRepository } from '@infrastructure/repositories/device.repository';
import { DatabaseProfileRepository } from '@infrastructure/repositories/profile.repository';
import { RepositoriesModule } from '@infrastructure/repositories/repositories.module';
import { DatabaseUserRepository } from '@infrastructure/repositories/user.repository';
import { AppleAuthService } from '@infrastructure/services/apple/apple-auth.service';
import { AppleModule } from '@infrastructure/services/apple/apple.module';
import { BcryptServiceModule } from '@infrastructure/services/bcrypt/bcrypt.module';
import { BcryptService } from '@infrastructure/services/bcrypt/bcrypt.service';
import { ExceptionsModule } from '@infrastructure/services/exceptions/exceptions.module';
import { GoogleAuthService } from '@infrastructure/services/google/google-auth.service';
import { GoogleModule } from '@infrastructure/services/google/google.module';
import { JwtServiceModule } from '@infrastructure/services/jwt/jwt.module';
import { JwtTokenService } from '@infrastructure/services/jwt/jwt.service';
import { KakaoAuthService } from '@infrastructure/services/kakao/kakao-auth.service';
import { KakaoModule } from '@infrastructure/services/kakao/kakao.module';
import { LoggerModule } from '@infrastructure/services/logger/logger.module';
import { RedisCacheModule } from '@infrastructure/services/redis-cache/redis-cache.module';
import { RedisCacheService } from '@infrastructure/services/redis-cache/redis-cache.service';
import { DynamicModule, Module } from '@nestjs/common';
import { AppleOAuthUseCases } from 'src/usecases/auth/apple-oauth.usecases';
import { GoogleOAuthUseCases } from 'src/usecases/auth/google-oauth.usecases';
import { KakaoOAuthUseCases } from 'src/usecases/auth/kakao-oauth.usecases';
import { LoginUseCases } from 'src/usecases/auth/login.usecases';
import { LogoutUseCases } from 'src/usecases/auth/logout.usecases';
import { CreateUserUseCases } from 'src/usecases/user/create-user.usercases';
import { UseCaseProxy } from './usercases-proxy';

@Module({
  imports: [
    LoggerModule,
    JwtServiceModule,
    BcryptServiceModule,
    EnvironmentConfigModule,
    RepositoriesModule,
    ExceptionsModule,
    RedisCacheModule,
    GoogleModule,
    KakaoModule,
    AppleModule,
  ],
})
export class UseCasesProxyModule {
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static GOOGLE_OAUTH_USECASES_PROXY = 'GoogleOAuthUseCasesProxy';
  static APPLE_OAUTH_USECASES_PROXY = 'AppleOAuthUseCasesProxy';
  static KAKAO_OAUTH_USECASES_PROXY = 'KakaoOAuthUseCasesProxy';
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';
  static CREATE_USER_USECASES_PROXY = 'CreateUserUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        {
          inject: [
            JwtTokenService,
            EnvironmentConfigService,
            DatabaseUserRepository,
            RedisCacheService,
            BcryptService,
          ],
          provide: UseCasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            userRepo: DatabaseUserRepository,
            redisCacheService: RedisCacheService,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new LoginUseCases(
                jwtTokenService,
                config,
                userRepo,
                redisCacheService,
                bcryptService,
              ),
            ),
        },
        {
          inject: [GoogleAuthService],
          provide: UseCasesProxyModule.GOOGLE_OAUTH_USECASES_PROXY,
          useFactory: (googleAuthService: GoogleAuthService) =>
            new UseCaseProxy(new GoogleOAuthUseCases(googleAuthService)),
        },
        {
          inject: [AppleAuthService],
          provide: UseCasesProxyModule.APPLE_OAUTH_USECASES_PROXY,
          useFactory: (appleAuthService: AppleAuthService) =>
            new UseCaseProxy(new AppleOAuthUseCases(appleAuthService)),
        },
        {
          inject: [KakaoAuthService],
          provide: UseCasesProxyModule.KAKAO_OAUTH_USECASES_PROXY,
          useFactory: (kakaoAuthService: KakaoAuthService) =>
            new UseCaseProxy(new KakaoOAuthUseCases(kakaoAuthService)),
        },
        {
          inject: [RedisCacheService],
          provide: UseCasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: (redisCacheService: RedisCacheService) =>
            new UseCaseProxy(new LogoutUseCases(redisCacheService)),
        },

        {
          inject: [
            DatabaseUserRepository,
            DatabaseDeviceRepository,
            DatabaseProfileRepository,
          ],
          provide: UseCasesProxyModule.CREATE_USER_USECASES_PROXY,
          useFactory: (
            userRepo: DatabaseUserRepository,
            deviceRepo: DatabaseDeviceRepository,
            profileRepo: DatabaseProfileRepository,
          ) =>
            new UseCaseProxy(
              new CreateUserUseCases(userRepo, deviceRepo, profileRepo),
            ),
        },
      ],
      exports: [
        UseCasesProxyModule.LOGIN_USECASES_PROXY,
        UseCasesProxyModule.LOGOUT_USECASES_PROXY,

        UseCasesProxyModule.GOOGLE_OAUTH_USECASES_PROXY,
        UseCasesProxyModule.APPLE_OAUTH_USECASES_PROXY,
        UseCasesProxyModule.KAKAO_OAUTH_USECASES_PROXY,

        UseCasesProxyModule.CREATE_USER_USECASES_PROXY,
      ],
    };
  }
}
