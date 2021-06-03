import {ConflictException, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNotesDto } from './dto/create-note.dto';
import { Notes } from './schema/notes.schema';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel('notes') private notesModel: Model<Notes>,
  ) {}

  async createNotes(newNotes: CreateNotesDto): Promise<Notes> {
    const createdNote = await this.notesModel.create({
      ...newNotes,
      content: ''
    });
    return createdNote;
  }
}
