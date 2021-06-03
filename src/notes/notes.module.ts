import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NotesSchema } from './schema/notes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'notes', schema: NotesSchema }]),
    ConfigModule,
  ],
  controllers: [NotesController],
  providers: [NotesService],
  exports: [NotesService],
})

export class NotesModule {}
