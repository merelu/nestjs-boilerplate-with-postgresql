import { ContactM } from '@domain/model/contact';

export interface ContactRepository {
  insert(contact: ContactM): Promise<ContactM>;
  findById(contactId: string): Promise<ContactM>;
  findAll(): Promise<ContactM[]>;
}
