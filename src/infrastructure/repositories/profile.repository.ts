import {
  CreateProfileModel,
  ProfileModel,
} from '@domain/model/database/profile';
import { IProfileRepository } from '@domain/repositories/profile.repository.interface';
import { Profile } from '@infrastructure/entities/profile.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class DatabaseProfileRepository implements IProfileRepository {
  constructor(
    @InjectRepository(Profile)
    private readonly profileEntityRepository: Repository<Profile>,
  ) {}

  async create(
    data: CreateProfileModel,
    conn?: EntityManager | undefined,
  ): Promise<ProfileModel> {
    const profileEntity = this.toProfileEntity(data);
    if (conn) {
      const result = await conn.getRepository(Profile).save(profileEntity);

      return result;
    }

    const result = await this.profileEntityRepository.save(profileEntity);

    return result;
  }

  private toProfile(data: Profile): ProfileModel {
    const result = new ProfileModel();
    result.id = data.id;
    result.name = data.name;
    result.mobile = data.mobile;
    result.email = data.email;
    result.gender = data.gender;
    result.birthday = data.birthday;
    result.profile_img_key = data.profile_img_key;
    result.profile_img_url = data.profile_img_url;
    result.created_at = data.created_at;
    result.created_at = data.created_at;

    return result;
  }

  private toProfileEntity(data: CreateProfileModel): Profile {
    const result = new Profile();
    result.name = data.name;
    result.email = data.email;
    result.gender = data.gender;
    result.birthday = data.birthday;
    result.profile_img_url = data.profile_img_url;

    return result;
  }
}
