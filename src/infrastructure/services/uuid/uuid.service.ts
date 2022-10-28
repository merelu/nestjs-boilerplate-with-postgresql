import { IUuidService } from '@domain/adapters/uuid.interface';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class UuidService implements IUuidService {
  uuid(): string {
    return uuidv4();
  }
}
