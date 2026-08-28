import { Controller, Get } from '@nestjs/common';
import { db } from '@stack/db';

@Controller()
export class AppController {
  constructor() {}

  @Get('health')
  async getHealth(): Promise<{ status: string; dbConnected: boolean }> {
    // Quick DB ping to verify @stack/db works from the NestJS app
    await db.query.users.findMany({ limit: 1 });
    return { status: 'ok', dbConnected: true };
  }
}
