import { UserM } from '@domain/model/user';

export interface UserRepository {
  insert(user: UserM): Promise<UserM>;
  getUserById(id: number): Promise<UserM>;
  getUserByEmail(email: string): Promise<UserM>;
  updateLastLogin(id: number): Promise<void>;
  updateDeviceToken(id: number, deviceToken: string): Promise<void>;
  updateRefreshTokenHash(id: number, refreshToken: string): Promise<void>;
}
