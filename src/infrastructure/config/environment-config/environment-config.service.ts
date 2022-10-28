import { DatabaseConfig } from '@domain/config/database.interface';
import { FirebaseConfig } from '@domain/config/firebase.interface';
import { JwtConfig } from '@domain/config/jwt.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService
  implements DatabaseConfig, JwtConfig, FirebaseConfig
{
  constructor(private configService: ConfigService) {}

  getFirebaseProjectId(): string {
    return this.configService.get<string>('FIREBASE_PROJECT_ID');
  }

  getFirebasePrivateKey(): string {
    return this.configService
      .get<string>('FIREBASE_PRIVATE_KEY')
      .replace(/\\n/g, '\n');
  }

  getFirebaseClientEmail(): string {
    return this.configService.get<string>('FIREBASE_CLIENT_EMAIL');
  }

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME');
  }

  getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
  }

  getJwtRefreshExpirationTime(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
  }

  getDatabasePort(): number {
    throw new Error('Method not implemented.');
  }

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }
}
