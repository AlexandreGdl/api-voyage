import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import { AuthService } from '../users/auth.service';
import { UsersSchema } from '../users/users.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }]),
  ],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
})

export class AuthModule {}
