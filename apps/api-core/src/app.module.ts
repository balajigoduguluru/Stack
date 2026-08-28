import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NotesModule } from './notes/notes.module';
import { TasksModule } from './tasks/tasks.module';
import { DocumentsModule } from './documents/documents.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { CalculatorsModule } from './calculators/calculators.module';
import { OcrModule } from './ocr/ocr.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    DatabaseModule,
    NotesModule,
    TasksModule,
    DocumentsModule,
    UsersModule,
    CalculatorsModule,
    OcrModule,
    AuthModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
