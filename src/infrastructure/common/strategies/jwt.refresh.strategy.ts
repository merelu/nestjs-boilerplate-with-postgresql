import { TokenPayload } from '@domain/model/auth';
import { EnvironmentConfigService } from '@infrastructure/config/environment-config/environment-config.service';
import { ExceptionsService } from '@infrastructure/exceptions/exceptions.service';
import { LoggerService } from '@infrastructure/logger/logger.service';
import { UseCasesProxyModule } from '@infrastructure/usercases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '@infrastructure/usercases-proxy/usercases-proxy';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LoginUseCases } from 'src/usecases/auth/login.usecases';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly configService: EnvironmentConfigService,
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionsService,
    @Inject(UseCasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Refresh;
        },
        ExtractJwt.fromBodyField('refresh_token'),
      ]),
      secretOrKey: configService.getJwtRefreshSecret(),
      ignoreExpiration: false,
      // passReqToCallback: true,
    });
  }

  async validate(payload: TokenPayload) {
    const user = await this.loginUsecaseProxy
      .getInstance()
      .getUserIfRefreshTokenMatches(payload.hash, payload.userId);
    if (!user) {
      this.logger.warn(
        'JwtRefreshTokenStrategy',
        `User not found or hash not correct`,
      );
      this.exceptionService.forbiddenException({
        message: 'User not found or hash not correct',
      });
    }
    return user;
  }
}
