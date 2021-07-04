import { Model } from 'mongoose';
import { CreateNotesDto } from './dto/create-note.dto';
import { Notes } from './schema/notes.schema';
export declare class NotesService {
    private notesModel;
    constructor(notesModel: Model<Notes>);
    createNotes(newNotes: CreateNotesDto): Promise<Notes>;
}
