import { UserM } from '@domain/model/user';
import { AuthJwt } from '@infrastructure/common/decorators/auth.decorator';
import { User } from '@infrastructure/common/decorators/user.decorator';
import {
  BaseMetaResponseFormat,
  ResponseFormat,
} from '@infrastructure/common/interceptors/response.interceptor';
import { ApiResponseType } from '@infrastructure/common/swagger/response.decorator';
import { UseCasesProxyModule } from '@infrastructure/usercases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '@infrastructure/usercases-proxy/usercases-proxy';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUserUseCases } from 'src/usecases/user/get.user.usecases';
import { SignupUseCases } from 'src/usecases/user/signup.usecases';
import { SignupDto } from './user.dto';
import { UserPresenter } from './user.presenter';

@Controller('user')
@ApiTags('User')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserPresenter)
export class UserController {
  constructor(
    @Inject(UseCasesProxyModule.SIGNUP_USECASES_PROXY)
    private readonly signupUseCaseProxy: UseCaseProxy<SignupUseCases>,
    @Inject(UseCasesProxyModule.GET_USER_USECASES_PROXY)
    private readonly getUserUseCaseProxy: UseCaseProxy<GetUserUseCases>,
  ) {}

  @Post()
  @ApiOperation({ description: '회원 가입' })
  @ApiResponseType(UserPresenter, BaseMetaResponseFormat)
  async signup(@Body() signupDto: SignupDto): Promise<ResponseFormat> {
    const { email, password, device_token } = signupDto;
    const userCreated = await this.signupUseCaseProxy
      .getInstance()
      .execute({ email, password, device_token });

    return { data: new UserPresenter(userCreated), meta: null };
  }

  @Get('me')
  @AuthJwt()
  @ApiOperation({ description: '유저 정보 호출(And 로그인 확인)' })
  @ApiResponseType(UserPresenter, BaseMetaResponseFormat)
  async getUser(@User() user: UserM): Promise<ResponseFormat> {
    return { data: new UserPresenter(user), meta: null };
  }

  @Get(':user_id')
  @AuthJwt()
  @ApiOperation({ description: '유저 정보 호출(by id)' })
  @ApiResponseType(UserPresenter, BaseMetaResponseFormat)
  async getUserById(@Param('user_id') id: string) {
    const result = await this.getUserUseCaseProxy.getInstance().execute(id);

    return { data: new UserPresenter(result), meta: null };
  }
}
