import { IBcryptService } from '@domain/adapters/bcrypt.interface';
import {
  IJwtService,
  IJwtServicePayload,
} from '@domain/adapters/jwt.interface';
import { IUuidService } from '@domain/adapters/uuid.interface';
import { JwtConfig } from '@domain/config/jwt.interface';
import { ILogger } from '@domain/logger/logger.interface';
import { UserWithoutPassword } from '@domain/model/user';
import { UserRepository } from '@domain/repositories/user.repository.interface';

export class LoginUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly jwtTokenService: IJwtService,
    private readonly jwtConfig: JwtConfig,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly UuidService: IUuidService,
  ) {}

  getJwtTokenAndCookie(userId: string) {
    this.logger.log(
      'LoginUseCases execute',
      `The user ${userId} have been logged(access_token).`,
    );
    const payload: IJwtServicePayload = { userId: userId };
    const secret = this.jwtConfig.getJwtSecret();
    const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);

    return {
      token,
      cookie: `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtExpirationTime()}`,
    };
  }

  async getJwtRefreshTokenAndCookie(userId: string) {
    this.logger.log(
      'LoginUseCases execute',
      `The user ${userId} have been logged(refresh_token).`,
    );
    const uuid = this.UuidService.uuid();
    const payload: IJwtServicePayload = {
      userId: userId,
      hash: uuid,
    };

    const secret = this.jwtConfig.getJwtRefreshSecret();
    const expiresIn = this.jwtConfig.getJwtRefreshExpirationTime() + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    await this.setCurrentRefreshTokenHash(uuid, userId);

    return {
      token,
      cookie: `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtRefreshExpirationTime()}`,
    };
  }

  async validateUserForLocalStrategy(
    email: string,
    password: string,
  ): Promise<UserWithoutPassword> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      return null;
    }
    const match = await this.bcryptService.compare(password, user.password);
    if (user && match) {
      await this.updateLoginTime(user.id);
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserForJWTStrategy(userId: string) {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      return null;
    }
    return user;
  }

  async updateLoginTime(userId: string) {
    await this.userRepository.updateLastLogin(userId);
  }

  async setCurrentRefreshTokenHash(key: string, userId: string) {
    const hashedKey = await this.bcryptService.hash(key);
    await this.userRepository.updateRefreshTokenHash(userId, hashedKey);
  }

  async getUserIfRefreshTokenMatches(refreshTokenHash: string, userId: string) {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      return null;
    }

    const isRefreshTokenMatching = await this.bcryptService.compare(
      refreshTokenHash,
      user.refresh_token_hash,
    );

    if (isRefreshTokenMatching) {
      return user;
    }

    return null;
  }
}
