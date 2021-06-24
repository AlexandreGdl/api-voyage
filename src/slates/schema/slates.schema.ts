import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

@Schema()
export class Slates extends Document {

  @Prop({ required: true })
  donorId: ObjectId;

  @Prop({ required: true })
  recipientId: ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ default: false, required: true })
  completed: boolean;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  voyageId: ObjectId;
}

export const SlatesSchema = SchemaFactory.createForClass(Slates);
