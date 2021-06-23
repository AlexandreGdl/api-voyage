import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import { VoyagesController} from "./voyages.controller";
import { VoyagesService} from "./voyages.service";
import {VoyagesSchema} from "./schema/voyages.schema";
import { UsersSchema } from 'src/users/users.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'voyages', schema: VoyagesSchema }]),
        MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }]),
        ConfigModule,
    ],
    controllers: [VoyagesController],
    providers: [VoyagesService],
    exports: [VoyagesService],
})

export class VoyagesModule {}
