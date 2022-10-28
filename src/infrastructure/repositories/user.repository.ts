import { UserM } from '@domain/model/user';
import { UserRepository } from '@domain/repositories/user.repository.interface';
import { User, UserDocument } from '@infrastructure/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userEntityRepository: Model<UserDocument>,
  ) {}

  async insert(user: UserM): Promise<UserM> {
    const userEntity = this.toUserEntity(user);
    const result = await this.userEntityRepository.create([userEntity]);
    return this.toUser(result[0]);
  }

  async getUserById(userId: string): Promise<UserM> {
    const userEntity = await this.userEntityRepository.findById(userId);
    if (!userEntity) {
      return null;
    }
    return this.toUser(userEntity);
  }

  async getUserByEmail(email: string): Promise<UserM> {
    const userEntity = await this.userEntityRepository.findOne({
      email: email,
    });

    if (!userEntity) {
      return null;
    }
    return this.toUser(userEntity);
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.userEntityRepository.findByIdAndUpdate(userId, {
      $set: { last_login: Date.now() },
    });
  }

  async updateRefreshTokenHash(
    userId: string,
    refreshTokenHash: string,
  ): Promise<void> {
    await this.userEntityRepository.findByIdAndUpdate(userId, {
      $set: { refresh_token_hash: refreshTokenHash },
    });
  }

  async updateDeviceToken(userId: string, deviceToken: string): Promise<void> {
    await this.userEntityRepository.findByIdAndUpdate(userId, {
      $set: { device_token: deviceToken },
    });
  }

  private toUser(userEntity: UserDocument): UserM {
    const user = new UserM();
    user.id = userEntity._id.toString();
    user.email = userEntity.email;
    user.password = userEntity.password;
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
    newUserEntity.last_login = user.last_login;

    return newUserEntity;
  }
}
