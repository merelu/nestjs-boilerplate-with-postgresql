import { ContactM } from '@domain/model/contact';

export interface ContactRepository {
  insert(contact: ContactM): Promise<ContactM>;
  findById(id: number): Promise<ContactM>;
  findAll(): Promise<ContactM[]>;
}
