import { UserModel } from '@domain/model/database/user';
import {
  AuthJwt,
  AuthRefreshJwt,
} from '@infrastructure/common/decorators/auth.decorator';
import { User } from '@infrastructure/common/decorators/user.decorator';
import { ApiResponseType } from '@infrastructure/common/decorators/response.decorator';
import { UseCasesProxyModule } from '@infrastructure/usercases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '@infrastructure/usercases-proxy/usercases-proxy';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Res,
} from '@nestjs/common';
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
import { OAuthLoginDto, RefreshTokenDto } from './auth.dto';
import { AuthUserPresenter, TokenPresenter } from './auth.presenter';
import { IException } from '@domain/exceptions/exceptions.interface';
import { CommonErrorCodeEnum } from '@domain/common/enums/error-code.enum';
import { ExceptionsService } from '@infrastructure/services/exceptions/exceptions.service';
import { GoogleOAuthUseCases } from 'src/usecases/auth/google-oauth.usecases';
import { CreateUserUseCases } from 'src/usecases/user/create-user.usercases';
import { OAuthTypeEnum } from '@domain/common/enums/user/oauth-type.enum';
import { DataSource } from 'typeorm';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(TokenPresenter, AuthUserPresenter)
export class AuthController {
  constructor(
    @Inject(UseCasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUseCasesProxy: UseCaseProxy<LoginUseCases>,
    @Inject(UseCasesProxyModule.LOGOUT_USECASES_PROXY)
    private readonly logoutUseCasesProxy: UseCaseProxy<LogoutUseCases>,
    @Inject(UseCasesProxyModule.GOOGLE_OAUTH_USECASES_PROXY)
    private readonly googleOAuthUseCasesProxy: UseCaseProxy<GoogleOAuthUseCases>,
    @Inject(UseCasesProxyModule.CREATE_USER_USECASES_PROXY)
    private readonly createUserUseCasesProxy: UseCaseProxy<CreateUserUseCases>,
    @Inject(ExceptionsService)
    private readonly exceptionService: IException,
    private readonly dataSource: DataSource,
  ) {}

  @Get('swagger')
  @ApiOperation({ summary: '???????????? ?????????' })
  @ApiResponseType(TokenPresenter)
  async swaggerLogin(
    @Query('userId') userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const usecase = this.loginUseCasesProxy.getInstance();
    const user = await usecase.validateUserForJWTStrategy(+userId);

    console.log(user);
    if (!user) {
      throw this.exceptionService.badRequestException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_description: '???????????? ???????????? ?????? ????????? ????????????.',
      });
    }
    const retAccess = usecase.getJwtTokenAndCookie(user.id);
    const retRefresh = await usecase.getJwtRefreshTokenAndCookie(user.id);

    res.setHeader('Set-Cookie', [retAccess.cookie, retRefresh.cookie]);
    return new TokenPresenter(retAccess.token, retRefresh.token);
  }

  @Post('google')
  @ApiOperation({ summary: 'Google OAuth2 ?????????' })
  @ApiResponseType(AuthUserPresenter)
  async googleLogin(
    @Body() body: OAuthLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const googleOAuthUseCase = this.googleOAuthUseCasesProxy.getInstance();
    const tokenInfo = await googleOAuthUseCase.authToken(body.token);
    if (!tokenInfo.sub || !tokenInfo.email) {
      throw this.exceptionService.badRequestException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_description: '????????? ????????? ????????????.',
      });
    }
    const createUserUseCase = this.createUserUseCasesProxy.getInstance();
    let user = await createUserUseCase.checkMachedOAuthUser(
      tokenInfo.sub,
      OAuthTypeEnum.google,
    );
    const connection = this.dataSource.createQueryRunner();
    await connection.connect();
    await connection.startTransaction();
    try {
      if (!user) {
        const payload = await googleOAuthUseCase.getUserInfo(
          body.token,
          tokenInfo.sub,
          tokenInfo.email,
        );
        user = await createUserUseCase.execute(
          payload,
          body.device_info.device_token,
          body.device_info.platform,
          connection.manager,
        );
      }
      const loginUseCase = this.loginUseCasesProxy.getInstance();
      const retAccess = loginUseCase.getJwtTokenAndCookie(user.id);
      const retRefresh = await loginUseCase.getJwtRefreshTokenAndCookie(
        user.id,
      );
      await connection.commitTransaction();
      res.setHeader('Set-Cookie', [retAccess.cookie, retRefresh.cookie]);

      return new AuthUserPresenter(retAccess.token, retRefresh.token, user);
    } catch (err) {
      await connection.rollbackTransaction();
      throw err;
    } finally {
      await connection.release();
    }
  }

  @Post('refresh')
  @AuthRefreshJwt()
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponseType(TokenPresenter)
  @ApiOperation({ description: '?????? ?????????' })
  async refresh(
    @User() user: UserModel,
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
      data: new TokenPresenter(retAccess.token, retRefresh.token),
    };
  }

  @Post('logout')
  @AuthJwt()
  @ApiOperation({ description: 'logout' })
  async logout(
    @User() user: UserModel,
    @Res({ passthrough: true }) res: Response,
  ) {
    const cookie = await this.logoutUseCasesProxy
      .getInstance()
      .execute(user.id);
    res.setHeader('Set-Cookie', cookie);

    return { data: 'Logout ??????' };
  }
}
