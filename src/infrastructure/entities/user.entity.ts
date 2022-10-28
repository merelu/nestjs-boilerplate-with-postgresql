import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CustomSchemaOptions } from './custom.schema.option';

export type UserDocument = User & Document;

@Schema(CustomSchemaOptions)
export class User {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    default: null,
  })
  device_token: string;

  @Prop({
    type: String,
    default: null,
  })
  refresh_token_hash: string;

  @Prop({
    type: Date,
  })
  last_login: Date;

  readonly created_at: Date;
  readonly updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
