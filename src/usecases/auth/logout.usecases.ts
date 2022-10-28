import { UserRepository } from '@domain/repositories/user.repository.interface';

export class LogoutUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<string[]> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      return null;
    }
    await this.userRepository.updateRefreshTokenHash(userId, null);
    await this.userRepository.updateDeviceToken(userId, null);

    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }
}
