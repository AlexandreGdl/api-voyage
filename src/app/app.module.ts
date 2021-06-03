import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { UsersModule } from 'src/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "../config/config.module";
import {ConfigService} from "../config/config.service";
import {PassportModule} from "@nestjs/passport";
import {UsersSchema} from "../users/users.schema";
import {JwtModule} from "@nestjs/jwt";
import { NotesModule } from 'src/notes/notes.module';
import { PlacesModule } from 'src/places/places.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (env: ConfigService) => ({
        uri: env.qualifiedMongoUri(),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        loggerLevel: env.get('MONGO_DEBUG_LEVEL') || 'error',
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
    PlacesModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})

export class AppModule {}
