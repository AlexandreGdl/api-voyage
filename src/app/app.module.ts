import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "../config/config.module";
import {ConfigService} from "../config/config.service";
import {PassportModule} from "@nestjs/passport";
import {UsersSchema} from "../users/users.schema";
import {JwtModule} from "@nestjs/jwt";
import { NotesModule } from '../notes/notes.module';
import { PlacesModule } from '../places/places.module';
import {VoyagesModule} from "../voyages/voyages.module";
import {TypesModule} from "../types/types.module";
import {WidgetsModule} from "../widgets/widgets.module";
import {SlatesModule} from "../slates/slates.module";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (env: ConfigService) => ({
        uri: env.qualifiedMongoUri(),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (env: ConfigService) => ({
        secret: env.get('jwt_secret'),
        signOptions: { expiresIn: '30d' },
      }),
    }),
    ConfigModule,
    UsersModule,
    NotesModule,
    PlacesModule,
    WidgetsModule,
    VoyagesModule,
    TypesModule,
    SlatesModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})

export class AppModule {}
