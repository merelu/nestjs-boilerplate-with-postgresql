import { OAuthTypeEnum } from '@domain/common/enums/user/oauth-type.enum';
import { CreateUserModel, UserModel } from '@domain/model/database/user';
import { IUserRepository } from '@domain/repositories/user.repository.interface';
import { User } from '@infrastructure/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';

@Injectable()
export class DatabaseUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async create(
    data: CreateUserModel,
    conn?: EntityManager,
  ): Promise<UserModel> {
    const userEntity = this.toUserEntity(data);
    if (conn) {
      const result = await conn.getRepository(User).save(userEntity);
      return this.toUser(result);
    }

    const result = await this.userEntityRepository.save(userEntity);
    return this.toUser(result);
  }

  async findUserById(
    id: number,
    conn?: EntityManager,
  ): Promise<UserModel | null> {
    if (conn) {
      const result = await conn
        .getRepository(User)
        .findOneOrFail({ where: { id } });

      return this.toUser(result);
    }
    const result = await this.userEntityRepository.findOne({
      where: { id },
    });
    if (!result) {
      return null;
    }
    return this.toUser(result);
  }

  async findByIdUserProfile(id: number): Promise<UserModel | null> {
    const result = await this.userEntityRepository.findOne({
      where: { id },
      relations: {
        profile: true,
      },
    });

    if (!result) {
      return null;
    }
    return this.toUser(result);
  }

  async findUserByOAuthPayload(
    provider: OAuthTypeEnum,
    providerUserId: string,
    conn?: EntityManager,
  ): Promise<UserModel | null> {
    if (conn) {
      const result = await conn.getRepository(User).findOne({
        where: { oauth_type: provider, oauth_user_id: providerUserId },
      });
      if (!result) return null;
      return this.toUser(result);
    }

    const result = await this.userEntityRepository.findOne({
      where: { oauth_type: provider, oauth_user_id: providerUserId },
    });
    if (!result) return null;

    return this.toUser(result);
  }

  async updateLastLogin(id: number, conn?: EntityManager): Promise<void> {
    if (conn) {
      await conn
        .getRepository(User)
        .update({ id }, { last_login_at: () => 'CURRENT_TIMESTAMP' });
    }
    await this.userEntityRepository.update(
      {
        id,
      },
      { last_login_at: () => 'CURRENT_TIMESTAMP' },
    );
  }

  private toUser(userEntity: User): UserModel {
    const result = new UserModel();
    result.id = userEntity.id;
    result.status = userEntity.status;

    result.oauth_type = userEntity.oauth_type;
    result.oauth_user_id = userEntity.oauth_user_id;

    result.last_login_at = userEntity.last_login_at;

    result.push_agree = userEntity.push_agree;

    result.withdraw = userEntity.withdraw;
    result.withdrew_at = userEntity.withdrew_at;

    result.profile = userEntity.profile;
    result.device = userEntity.device;

    result.created_at = userEntity.created_at;
    result.updated_at = userEntity.updated_at;

    return result;
  }

  private toUserEntity(user: CreateUserModel): User {
    const result: User = new User();

    result.oauth_type = user.oauth_type;
    result.oauth_user_id = user.oauth_user_id;
    result.profile = user.profile;
    result.device = user.device;

    return result;
  }
}
