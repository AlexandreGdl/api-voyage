import {
    Body,
    Controller, Get, NotFoundException, Post, UseGuards,
  } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '../config/config.service';
import { AuthGuard } from '@nestjs/passport';
import { Notes } from './schema/notes.schema';
import { AuthUser } from '../security/decorator/auth-user.decorator';
import { CreateNotesDto } from './dto/create-note.dto';
import { Users } from '../users/users.schema';
import { NotesService } from './notes.service';
  
  @Controller('/notes')
  @ApiTags('‍📝 Notes')
  export class NotesController {
    
    constructor(
      private readonly notesService: NotesService,
      protected readonly env: ConfigService,
    ) {
    }
  
    @Get('')
    @UseGuards(AuthGuard('jwt'))
    async getNotes(): Promise<boolean> {
        return true;
    }
    
    @Post('')
    @UseGuards(AuthGuard('jwt'))
    async createNotes(@AuthUser() user: Users, @Body() newNotes: CreateNotesDto): Promise<Notes> {
        return this.notesService.createNotes(newNotes)
        return {} as Notes;
    }
  }
  