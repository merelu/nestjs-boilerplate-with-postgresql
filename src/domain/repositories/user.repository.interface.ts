import { UserM } from '@domain/model/user';

export interface UserRepository {
  insert(user: UserM): Promise<UserM>;
  getUserById(userId: string): Promise<UserM>;
  getUserByEmail(email: string): Promise<UserM>;
  updateLastLogin(userId: string): Promise<void>;
  updateDeviceToken(userId: string, deviceToken: string): Promise<void>;
  updateRefreshTokenHash(userId: string, refreshToken: string): Promise<void>;
}
