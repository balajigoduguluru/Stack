import { Injectable, Inject } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database.provider';
import { schema } from '@stack/db';
import { eq } from 'drizzle-orm';

@Injectable()
export class NotesService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: any) {}

  async create(userId: string, createNoteDto: any) {
    // 1. Insert the note first to get its ID
    const [note] = await this.db.insert(schema.notes).values({
      userId,
      title: createNoteDto.title,
      content: createNoteDto.content,
    }).returning();

    // 2. Generate Flashcards & Summary in the background if API key exists
    if (createNoteDto.content && process.env.OPENAI_API_KEY) {
      try {
        const OpenAI = require('openai').default;
        const openai = new OpenAI();
        
        const systemPrompt = `You are an expert tutor. Given the student's study notes, generate exactly 5 flashcards for active recall. Also generate a 2 sentence summary. Return ONLY JSON matching this format: { "summary": "...", "flashcards": [{ "front": "question", "back": "answer" }] }`;
        
        const response = await openai.chat.completions.create({
          model: 'gpt-4o',
          messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: createNoteDto.content }],
          response_format: { type: 'json_object' }
        });
        
        const aiData = JSON.parse(response.choices[0].message.content);
        
        // Update Note with Summary
        await this.db.update(schema.notes)
          .set({ summary: aiData.summary })
          .where(eq(schema.notes.id, note.id));
          
        note.summary = aiData.summary; // Optimistic update for return

        // Insert Flashcards
        if (aiData.flashcards && aiData.flashcards.length > 0) {
          const cardsToInsert = aiData.flashcards.map((fc: any) => ({
            userId,
            noteId: note.id,
            deckName: createNoteDto.title + ' Flashcards',
            front: fc.front,
            back: fc.back,
          }));
          await this.db.insert(schema.flashcards).values(cardsToInsert);
        }
      } catch (e) {
        console.error('AI Processing failed', e);
      }
    } else if (createNoteDto.content) {
      // Mock Data if no API Key
      note.summary = 'Mock AI Summary: ' + createNoteDto.content.substring(0, 20) + '...';
      await this.db.update(schema.notes).set({ summary: note.summary }).where(eq(schema.notes.id, note.id));
      
      await this.db.insert(schema.flashcards).values({
        userId,
        noteId: note.id,
        deckName: 'Mock Deck',
        front: 'What is the mock question?',
        back: 'The mock answer.',
      });
    }

    return note;
  }

  async findAll(userId: string) {
    return this.db.query.notes.findMany({
      where: eq(schema.notes.userId, userId),
      orderBy: (notes: any, { desc }: any) => [desc(notes.updatedAt)],
    });
  }

  async findOne(id: string, userId: string) {
    return this.db.query.notes.findFirst({
      where: eq(schema.notes.id, id),
    });
  }

  async findFlashcards(noteId: string, userId: string) {
    return this.db.query.flashcards.findMany({
      where: eq(schema.flashcards.noteId, noteId),
    });
  }

  async update(id: string, userId: string, updateNoteDto: any) {
    const result = await this.db.update(schema.notes)
      .set({
        ...updateNoteDto,
        updatedAt: new Date(),
      })
      .where(eq(schema.notes.id, id))
      .returning();
    return result[0];
  }

  async remove(id: string, userId: string) {
    await this.db.delete(schema.notes).where(eq(schema.notes.id, id));
    return { success: true };
  }
}
