import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

@Schema()
export class Widgets extends Document {

  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const WidgetsSchema = SchemaFactory.createForClass(Widgets);
