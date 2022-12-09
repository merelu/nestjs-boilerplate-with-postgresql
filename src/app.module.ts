import { EnvironmentConfigModule } from '@infrastructure/config/environment-config/environment-config.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { BcryptServiceModule } from '@infrastructure/services/bcrypt/bcrypt.module';
import { JwtServiceModule } from '@infrastructure/services/jwt/jwt.module';
import { UseCasesProxyModule } from '@infrastructure/usercases-proxy/usecases-proxy.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@infrastructure/common/strategies/jwt.strategy';
import { JwtRefreshTokenStrategy } from '@infrastructure/common/strategies/jwt.refresh.strategy';
import { ControllersModule } from '@infrastructure/controllers/controllers.module';
import { LoggerModule } from '@infrastructure/services/logger/logger.module';
import { ExceptionsModule } from '@infrastructure/services/exceptions/exceptions.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/static',
    }),
    EnvironmentConfigModule,
    ExceptionsModule,
    LoggerModule,
    BcryptServiceModule,
    JwtServiceModule,
    UseCasesProxyModule.register(),
    PassportModule,
    ControllersModule,
  ],
  providers: [JwtStrategy, JwtRefreshTokenStrategy],
})
export class AppModule {}
