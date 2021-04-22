import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersSchema } from './users.schema';
import { ConfigModule } from '../config/config.module';
import { AuthModule } from '../security/auth.module';
import { JwtStrategy } from '../security/strategy/jwt.strategy';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }]),
    ConfigModule,
    AuthModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (env: ConfigService) => ({
        secret: env.get('jwt_secret'),
        signOptions: { expiresIn: '30d' },
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService],
})

export class UsersModule {}
