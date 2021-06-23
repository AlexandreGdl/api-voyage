import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Location } from '../interface/location.interface';

@Schema()
export class Voyages extends Document {

    @Prop()
    ownerId: ObjectId;

    @Prop({ required: false })
    memberIds?: ObjectId[];

    @Prop()
    name: string;

    @Prop({ required: false })
    selectedWidgets?: ObjectId[];

    @Prop()
    defaultName: string;

    @Prop()
    createdDate: Date;

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;

    @Prop()
    cityName: string;

    @Prop()
    location: Location
}

export const VoyagesSchema = SchemaFactory.createForClass(Voyages);
