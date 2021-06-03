import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

@Schema()
export class Notes extends Document {

  @Prop({default: ''})
  content: string;

  @Prop()
  voyageId: ObjectId;

  @Prop()
  name: string;
}

export const NotesSchema = SchemaFactory.createForClass(Notes);
