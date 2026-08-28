import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface StoredFileResult {
  url: string;
  key: string;
  sizeBytes: number;
}

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly uploadDir = path.join(process.cwd(), 'uploads');

  constructor() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(file: { originalname: string; buffer: Buffer; mimetype: string }): Promise<StoredFileResult> {
    const filename = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = path.join(this.uploadDir, filename);

    // Save file to local disk
    await fs.promises.writeFile(filePath, file.buffer);

    this.logger.log(`Uploaded file locally to: ${filePath}`);

    return {
      url: `/uploads/${filename}`,
      key: filename,
      sizeBytes: file.buffer.length,
    };
  }

  async deleteFile(key: string): Promise<boolean> {
    try {
      const filePath = path.join(this.uploadDir, key);
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      }
      return true;
    } catch (e) {
      this.logger.error(`Failed to delete file ${key}`, e);
      return false;
    }
  }
}
