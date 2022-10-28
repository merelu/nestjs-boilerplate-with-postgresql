import { UserM } from '@domain/model/user';
import {
  AuthJwt,
  AuthLogin,
  AuthRefreshJwt,
} from '@infrastructure/common/decorators/auth.decorator';
import { User } from '@infrastructure/common/decorators/user.decorator';
import { BaseMetaResponseFormat } from '@infrastructure/common/interceptors/response.interceptor';
import { ApiResponseType } from '@infrastructure/common/swagger/response.decorator';
import { UseCasesProxyModule } from '@infrastructure/usercases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '@infrastructure/usercases-proxy/usercases-proxy';
import { Controller, Inject, Post, Res } from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { LoginUseCases } from 'src/usecases/auth/login.usecases';
import { LogoutUseCases } from 'src/usecases/auth/logout.usecases';
import { AuthLoginDto, RefreshTokenDto } from './auth.dto';
import { IsAuthPresenter } from './auth.presenter';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(IsAuthPresenter, BaseMetaResponseFormat)
export class AuthController {
  constructor(
    @Inject(UseCasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUseCasesProxy: UseCaseProxy<LoginUseCases>,
    @Inject(UseCasesProxyModule.LOGOUT_USECASES_PROXY)
    private readonly logoutUseCasesProxy: UseCaseProxy<LogoutUseCases>,
  ) {}

  @Post('')
  @AuthLogin()
  @ApiBody({ type: AuthLoginDto })
  @ApiOperation({ description: '로그인(이메일, 비밀번호)' })
  @ApiResponseType(IsAuthPresenter, BaseMetaResponseFormat)
  async login(@User() user: UserM, @Res({ passthrough: true }) res: Response) {
    const retAccess = this.loginUseCasesProxy
      .getInstance()
      .getJwtTokenAndCookie(user.id);

    const retRefresh = await this.loginUseCasesProxy
      .getInstance()
      .getJwtRefreshTokenAndCookie(user.id);
    res.setHeader('Set-Cookie', [retAccess.cookie, retRefresh.cookie]);

    return {
      data: new IsAuthPresenter(retAccess.token, retRefresh.token),
    };
  }

  @Post('refresh')
  @AuthRefreshJwt()
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponseType(IsAuthPresenter, BaseMetaResponseFormat)
  @ApiOperation({ description: '토큰 재발급' })
  async refresh(
    @User() user: UserM,
    @Res({ passthrough: true }) res: Response,
  ) {
    const retAccess = this.loginUseCasesProxy
      .getInstance()
      .getJwtTokenAndCookie(user.id);

    const retRefresh = await this.loginUseCasesProxy
      .getInstance()
      .getJwtRefreshTokenAndCookie(user.id);

    res.setHeader('Set-Cookie', [retAccess.cookie, retRefresh.cookie]);
    return {
      data: new IsAuthPresenter(retAccess.token, retRefresh.token),
    };
  }

  @Post('logout')
  @AuthJwt()
  @ApiOperation({ description: 'logout' })
  async logout(@User() user: UserM, @Res({ passthrough: true }) res: Response) {
    const cookie = await this.logoutUseCasesProxy
      .getInstance()
      .execute(user.id);
    res.setHeader('Set-Cookie', cookie);

    return { data: 'Logout 성공' };
  }
}
