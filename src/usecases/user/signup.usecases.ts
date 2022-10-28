import { IBcryptService } from '@domain/adapters/bcrypt.interface';
import { ISignupDto } from '@domain/dto/user.dto.interface';
import { ILogger } from '@domain/logger/logger.interface';
import { UserM } from '@domain/model/user';
import { UserRepository } from '@domain/repositories/user.repository.interface';

export class SignupUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async execute(data: ISignupDto): Promise<UserM> {
    const newUser = new UserM();
    newUser.email = data.email;
    newUser.password = await this.bcryptService.hash(data.password);
    newUser.device_token = data.device_token;

    const result = await this.userRepository.insert(newUser);
    this.logger.log('signupUseCases exceute', 'New user have been inserted');

    return result;
  }
}
