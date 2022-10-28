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
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UseCasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionsService,
    private readonly configService: EnvironmentConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies.Authentication;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: configService.getJwtSecret(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: TokenPayload) {
    const user = this.loginUsecaseProxy
      .getInstance()
      .validateUserForJWTStrategy(payload.userId);
    if (!user) {
      this.logger.warn('JwtStrategy', `User not found`);
      this.exceptionService.forbiddenException({ message: 'User not found' });
    }
    return user;
  }
}
