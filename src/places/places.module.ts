import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.services';
import { PlacesSchema } from './schema/places.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'places', schema: PlacesSchema }]),
    ConfigModule,
  ],
  controllers: [PlacesController],
  providers: [PlacesService],
  exports: [PlacesService],
})

export class PlacesModule {}
