import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OcrService } from './ocr.service';

@Controller('ocr')
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @Post('extract')
  @UseInterceptors(FileInterceptor('file'))
  async extractText(@UploadedFile() file: any, @Body() body: any) {
    if (!file) {
      throw new BadRequestException('No image or PDF file uploaded for OCR extraction');
    }

    return this.ocrService.extractText(file, {
      language: body.language,
      preserveFormat: body.preserveFormat === 'true' || body.preserveFormat === true,
    });
  }
}
