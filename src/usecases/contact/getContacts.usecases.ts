import { ContactM } from '@domain/model/contact';
import { ContactRepository } from '@domain/repositories/contact.repository.interface';

export class GetContactsUseCases {
  constructor(private readonly contactRepository: ContactRepository) {}

  async execute(): Promise<ContactM[]> {
    return await this.contactRepository.findAll();
  }
}
