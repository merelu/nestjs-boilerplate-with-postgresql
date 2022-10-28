import { ContactM } from '@domain/model/contact';
import { ContactRepository } from '@domain/repositories/contact.repository.interface';

export class GetContactUseCases {
  constructor(private readonly contactRepository: ContactRepository) {}

  async execute(id: string): Promise<ContactM> {
    return await this.contactRepository.findById(id);
  }
}
