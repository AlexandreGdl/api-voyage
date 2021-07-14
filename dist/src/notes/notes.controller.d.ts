import { ConfigService } from '../config/config.service';
import { Notes } from './schema/notes.schema';
import { CreateNotesDto } from './dto/create-note.dto';
import { Users } from '../users/users.schema';
import { NotesService } from './notes.service';
export declare class NotesController {
    private readonly notesService;
    protected readonly env: ConfigService;
    constructor(notesService: NotesService, env: ConfigService);
    getNotes(): Promise<boolean>;
    createNotes(user: Users, newNotes: CreateNotesDto): Promise<Notes>;
}
