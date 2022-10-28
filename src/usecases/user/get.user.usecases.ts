import { UserWithoutPassword } from '@domain/model/user';
import { UserRepository } from '@domain/repositories/user.repository.interface';

export class GetUserUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<UserWithoutPassword> {
    const user = await this.userRepository.getUserById(userId);
    const { password, ...result } = user;
    return result;
  }
}
