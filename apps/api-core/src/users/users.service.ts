import { Injectable, Inject } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { schema } from '@stack/db';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private readonly db: any,
  ) {}

  async findMe() {
    // Fetch first user for demo purposes, and their subscription
    const allUsers = await this.db.select().from(schema.users).limit(1);
    if (allUsers.length === 0) {
      // Create a mock user if none exists
      const [newUser] = await this.db.insert(schema.users).values({
        email: 'student@university.edu',
        name: 'Student Name',
      }).returning();
      
      const [newSub] = await this.db.insert(schema.subscriptions).values({
        userId: newUser.id,
        tier: 'free',
        aiCreditsUsed: 45,
        aiCreditsLimit: 100
      }).returning();
      
      return { ...newUser, subscription: newSub };
    }
    
    const user = allUsers[0];
    const subs = await this.db.select().from(schema.subscriptions).where(eq(schema.subscriptions.userId, user.id));
    let subscription = subs[0];
    
    if (!subscription) {
      const [newSub] = await this.db.insert(schema.subscriptions).values({
        userId: user.id,
        tier: 'free',
        aiCreditsUsed: 45,
        aiCreditsLimit: 100
      }).returning();
      subscription = newSub;
    }
    
    return { ...user, subscription };
  }

  async updateMe(data: any) {
    const user = await this.findMe();
    
    if (data.name || data.email) {
      await this.db.update(schema.users)
        .set({ name: data.name || user.name, email: data.email || user.email })
        .where(eq(schema.users.id, user.id));
    }
    
    return this.findMe();
  }
}
