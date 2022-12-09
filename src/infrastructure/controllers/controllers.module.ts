import { ExceptionsModule } from '@infrastructure/services/exceptions/exceptions.module';
import { UseCasesProxyModule } from '@infrastructure/usercases-proxy/usecases-proxy.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [UseCasesProxyModule.register(), ExceptionsModule],
  controllers: [UserController, AuthController],
})
export class ControllersModule {}
