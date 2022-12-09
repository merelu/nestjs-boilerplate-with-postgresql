import {
  CreateProfileModel,
  ProfileModel,
} from '@domain/model/database/profile';
import { EntityManager } from 'typeorm';

export interface IProfileRepository {
  create(data: CreateProfileModel, conn?: EntityManager): Promise<ProfileModel>;
}
