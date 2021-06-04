import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import { TypesController } from './types.controller';
import { TypesService } from './types.service';
import { TypesSchema } from './types.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'types', schema: TypesSchema }]),
        ConfigModule,
    ],
    controllers: [TypesController],
    providers: [TypesService],
    exports: [TypesService],
})

export class TypesModule {}