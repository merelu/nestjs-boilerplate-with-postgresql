import { CreateDeviceModel, DeviceModel } from '@domain/model/database/device';
import { IDeviceRepository } from '@domain/repositories/device.repository.interface';
import { Device } from '@infrastructure/entities/device.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class DatabaseDeviceRepository implements IDeviceRepository {
  constructor(
    @InjectRepository(Device)
    private readonly deviceEntityRepository: Repository<Device>,
  ) {}
  async create(
    data: CreateDeviceModel,
    conn?: EntityManager | undefined,
  ): Promise<DeviceModel> {
    const deviceEntity = this.toDeviceEntity(data);
    if (conn) {
      const result = await conn.getRepository(Device).save(deviceEntity);
      return result;
    }
    const result = await this.deviceEntityRepository.save(deviceEntity);
    return result;
  }

  private toDevice(deviceEntity: Device): DeviceModel {
    const result = new DeviceModel();
    result.id = deviceEntity.id;
    result.device_token = deviceEntity.device_token;
    result.device_token_timestamp = deviceEntity.device_token_timestamp;
    result.platform = deviceEntity.platform;
    result.created_at = deviceEntity.created_at;
    result.updated_at = deviceEntity.updated_at;

    return result;
  }

  private toDeviceEntity(data: CreateDeviceModel): Device {
    const result = new Device();

    result.device_token = data.device_token;
    result.platform = data.platform;

    return result;
  }
}
