import { UserM } from '@domain/model/user';
import { UserRepository } from '@domain/repositories/user.repository.interface';
import { User } from '@infrastructure/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async insert(user: UserM): Promise<UserM> {
    const userEntity = this.toUserEntity(user);
    const result = await this.userEntityRepository.insert(userEntity);
    return this.toUser(result.generatedMaps[0] as User);
  }

  async getUserById(id: number): Promise<UserM> {
    const userEntity = await this.userEntityRepository.findOneOrFail({
      where: { id },
    });
    return this.toUser(userEntity);
  }

  async getUserByEmail(email: string): Promise<UserM> {
    const userEntity = await this.userEntityRepository.findOne({
      where: { email },
    });

    if (!userEntity) {
      return null;
    }
    return this.toUser(userEntity);
  }

  async updateLastLogin(id: number): Promise<void> {
    await this.userEntityRepository.update(
      {
        id,
      },
      { last_login: () => 'CURRENT_TIMESTAMP' },
    );
  }

  async updateRefreshTokenHash(
    id: number,
    refreshTokenHash: string,
  ): Promise<void> {
    await this.userEntityRepository.update(
      { id },
      { refresh_token_hash: refreshTokenHash },
    );
  }

  async updateDeviceToken(id: number, deviceToken: string): Promise<void> {
    await this.userEntityRepository.update(
      { id },
      {
        device_token: deviceToken,
      },
    );
  }

  private toUser(userEntity: User): UserM {
    const user = new UserM();
    user.id = userEntity.id;
    user.email = userEntity.email;
    user.password = userEntity.password;
    user.device_token = userEntity.device_token;
    user.created_at = userEntity.created_at;
    user.updated_at = userEntity.updated_at;
    user.last_login = userEntity.last_login;
    user.refresh_token_hash = userEntity.refresh_token_hash;

    return user;
  }

  private toUserEntity(user: UserM): User {
    const newUserEntity: User = new User();

    newUserEntity.email = user.email;
    newUserEntity.password = user.password;
    newUserEntity.device_token = user.device_token;

    return newUserEntity;
  }
}
