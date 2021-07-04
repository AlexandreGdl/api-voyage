import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import { SlatesController } from './slates.controller';
import { SlatesService } from './slates.service';
import {SlatesSchema} from "./schema/slates.schema";
import {UsersSchema} from "../users/users.schema";
import {VoyagesSchema} from "../voyages/schema/voyages.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'slates', schema: SlatesSchema }]),
    MongooseModule.forFeature([{ name: 'voyages', schema: VoyagesSchema }]),
    MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }]),
    ConfigModule,
  ],
  controllers: [SlatesController],
  providers: [SlatesService],
  exports: [SlatesService],
})

export class SlatesModule {}