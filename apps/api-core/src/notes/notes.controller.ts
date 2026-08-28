import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';

// Mock Guard until Auth is wired up
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
@Injectable()
export class MockAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // Hardcode a mock user for now, this would normally extract from JWT/NextAuth session
    request.user = { id: '00000000-0000-0000-0000-000000000000' };
    return true;
  }
}

@Controller('notes')
@UseGuards(MockAuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Request() req: any, @Body() createNoteDto: any) {
    return this.notesService.create(req.user.id, createNoteDto);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.notesService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.notesService.findOne(id, req.user.id);
  }

  @Get(':id/flashcards')
  findFlashcards(@Request() req: any, @Param('id') id: string) {
    return this.notesService.findFlashcards(id, req.user.id);
  }

  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() updateNoteDto: any) {
    return this.notesService.update(id, req.user.id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.notesService.remove(id, req.user.id);
  }
}
