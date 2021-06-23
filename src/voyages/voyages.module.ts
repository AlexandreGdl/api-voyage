import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import { VoyagesController} from "./voyages.controller";
import { VoyagesService} from "./voyages.service";
import {VoyagesSchema} from "./schema/voyages.schema";
import {WidgetsSchema} from "../widgets/schema/widgets.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'voyages', schema: VoyagesSchema }]),
        MongooseModule.forFeature([{ name: 'widgets', schema: WidgetsSchema }]),
        ConfigModule,
    ],
    controllers: [VoyagesController],
    providers: [VoyagesService],
    exports: [VoyagesService],
})

export class VoyagesModule {}
