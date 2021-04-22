import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Users extends Document {

  @Prop()
  username: string; // full username

  @Prop()
  email: string;

  @Prop()
  password: string;

}

export const UsersSchema = SchemaFactory.createForClass(Users);
