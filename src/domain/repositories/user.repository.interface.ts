import { OAuthTypeEnum } from '@domain/common/enums/user/oauth-type.enum';
import { CreateUserModel, UserModel } from '@domain/model/database/user';
import { EntityManager } from 'typeorm';

export interface IUserRepository {
  create(data: CreateUserModel, conn?: EntityManager): Promise<UserModel>;
  findUserById(id: number, conn?: EntityManager): Promise<UserModel | null>;
  findUserByOAuthPayload(
    provider: OAuthTypeEnum,
    providerUserId: string,
    conn?: EntityManager,
  ): Promise<UserModel | null>;
  updateLastLogin(id: number, conn?: EntityManager): Promise<void>;
}
