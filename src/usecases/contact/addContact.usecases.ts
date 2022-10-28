import { IAddContactDto } from '@domain/dto/contact.dto.interface';
import { ILogger } from '@domain/logger/logger.interface';
import { ContactM } from '@domain/model/contact';
import { ContactRepository } from '@domain/repositories/contact.repository.interface';

export class AddContactUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly contactRepository: ContactRepository,
  ) {}

  async execute(data: IAddContactDto) {
    const newContact = new ContactM();
    newContact.name = data.name;
    newContact.email = data.email;
    newContact.phone = data.phone;
    newContact.company = data.company;
    newContact.etc = data.etc;

    newContact.service_platform = data.service_platform;
    newContact.service_type = data.service_type;
    newContact.project_scale = data.project_scale;
    newContact.design_type = data.design_type;
    newContact.budget_scale = data.budget_scale;

    newContact.develop_period = data.develop_period;
    newContact.contactable_time = data.contactable_time;
    newContact.reservation_date = data.reservation_date;

    const result = await this.contactRepository.insert(newContact);

    this.logger.log(
      'addContactUseCases execute',
      'New Contact have been inserted',
    );
    return result;
  }
}
