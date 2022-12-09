import { CreateDeviceModel, DeviceModel } from '@domain/model/database/device';
import { EntityManager } from 'typeorm';

export interface IDeviceRepository {
  create(data: CreateDeviceModel, conn?: EntityManager): Promise<DeviceModel>;
}
