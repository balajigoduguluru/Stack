import { Injectable, Inject } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database.provider';
import { schema } from '@stack/db';
import { eq } from 'drizzle-orm';

@Injectable()
export class TasksService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: any) {}

  async create(userId: string, createTaskDto: any) {
    const result = await this.db.insert(schema.tasks).values({
      userId,
      title: createTaskDto.title,
      description: createTaskDto.description,
      dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : null,
      estimatedPomodoros: createTaskDto.estimatedPomodoros || 1,
    }).returning();
    return result[0];
  }

  async findAll(userId: string) {
    return this.db.query.tasks.findMany({
      where: eq(schema.tasks.userId, userId),
    });
  }

  async findOne(id: string, userId: string) {
    return this.db.query.tasks.findFirst({
      where: eq(schema.tasks.id, id),
    });
  }

  async update(id: string, userId: string, updateTaskDto: any) {
    const result = await this.db.update(schema.tasks)
      .set({
        ...updateTaskDto,
        updatedAt: new Date(),
      })
      .where(eq(schema.tasks.id, id))
      .returning();
    return result[0];
  }

  async remove(id: string, userId: string) {
    await this.db.delete(schema.tasks).where(eq(schema.tasks.id, id));
    return { success: true };
  }
}
