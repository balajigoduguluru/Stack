import { Injectable, Inject } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database.provider';
import { schema } from '@stack/db';
import { eq } from 'drizzle-orm';

@Injectable()
export class DocumentsService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: any) {}

  async create(userId: string, createDocumentDto: any) {
    const result = await this.db.insert(schema.documents).values({
      userId,
      title: createDocumentDto.title,
      s3Url: createDocumentDto.s3Url,
      s3Key: createDocumentDto.s3Key || createDocumentDto.s3Url || 'mock-s3-key',
      sizeBytes: createDocumentDto.sizeBytes,
    }).returning();
    return result[0];
  }

  async findAll(userId: string) {
    return this.db.query.documents.findMany({
      where: eq(schema.documents.userId, userId),
    });
  }

  async findOne(id: string, userId: string) {
    return this.db.query.documents.findFirst({
      where: eq(schema.documents.id, id),
    });
  }

  async remove(id: string, userId: string) {
    await this.db.delete(schema.documents).where(eq(schema.documents.id, id));
    return { success: true };
  }
}
