import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Location } from '../interface/location.interface'

@Schema()
export class Places extends Document {

  @Prop()
  typeId: ObjectId;

  @Prop()
  voyageId?: ObjectId;

  @Prop()
  position: Location;

  @Prop()
  name: string;

  @Prop({required: false})
  mediaId?: ObjectId;

  @Prop()
  isGlobal?: boolean
}

export const PlacesSchema = SchemaFactory.createForClass(Places);
