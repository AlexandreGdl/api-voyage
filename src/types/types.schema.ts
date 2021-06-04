import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Types extends Document {

    @Prop()
    name: string;

}

export const TypesSchema = SchemaFactory.createForClass(Types);
