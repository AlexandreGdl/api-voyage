import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../config/config.module';
import { JwtStrategy } from '../security/strategy/jwt.strategy';
import { ConfigService } from '../config/config.service';
import { VoyagesController} from "./voyages.controller";
import { VoyagesService} from "./voyages.service";
import {VoyagesSchema} from "./schema/voyages.schema";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'voyages', schema: VoyagesSchema }]),
        ConfigModule,
    ],
    controllers: [VoyagesController],
    providers: [VoyagesService],
    exports: [VoyagesService],
})

export class VoyagesModule {}
