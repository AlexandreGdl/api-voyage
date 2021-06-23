import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import {WidgetsSchema} from "./schema/widgets.schema";
import {WidgetsController} from "./widgets.controller";
import {WidgetService} from "./widgets.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'widgets', schema: WidgetsSchema }]),
    ConfigModule,
  ],
  controllers: [WidgetsController],
  providers: [WidgetService],
  exports: [WidgetService],
})

export class WidgetsModule {}
