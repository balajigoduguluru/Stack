import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';
import { MockAuthGuard } from '../notes/notes.controller';
import { StorageService } from './storage.service';

@Controller('documents')
@UseGuards(MockAuthGuard)
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly storageService: StorageService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Request() req: any, @UploadedFile() file: any, @Body() body: any) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const stored = await this.storageService.uploadFile(file);

    const doc = await this.documentsService.create(req.user.id, {
      title: body.title || file.originalname,
      s3Url: stored.url,
      sizeBytes: stored.sizeBytes,
    });

    return {
      status: 'success',
      document: doc,
    };
  }

  @Post()
  create(@Request() req: any, @Body() createDocumentDto: any) {
    return this.documentsService.create(req.user.id, createDocumentDto);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.documentsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.documentsService.findOne(id, req.user.id);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.documentsService.remove(id, req.user.id);
  }
}
