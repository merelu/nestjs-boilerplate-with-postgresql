import { EnvironmentConfigModule } from '@infrastructure/config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '@infrastructure/config/environment-config/environment-config.service';
import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [
    {
      inject: [EnvironmentConfigService],
      provide: FirebaseService,
      useFactory: (config: EnvironmentConfigService) =>
        new FirebaseService(config),
    },
  ],
  exports: [FirebaseService],
})
export class FirebaseModule {}
