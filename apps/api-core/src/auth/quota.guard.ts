import { Injectable, CanActivate, ExecutionContext, ForbiddenException, Inject } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database.provider';
import { schema } from '@stack/db';
import { eq } from 'drizzle-orm';

@Injectable()
export class QuotaGuard implements CanActivate {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: any) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id || 'mock-student-id';

    const subs = await this.db
      .select()
      .from(schema.subscriptions)
      .where(eq(schema.subscriptions.userId, userId));

    const subscription = subs[0];

    if (subscription) {
      if (subscription.tier === 'free' && subscription.aiCreditsUsed >= subscription.aiCreditsLimit) {
        throw new ForbiddenException(
          `AI credit limit reached (${subscription.aiCreditsUsed}/${subscription.aiCreditsLimit}). Upgrade to Pro for unlimited generation.`
        );
      }
    }

    return true;
  }
}
