import { Controller, Get } from '@nestjs/common';
import { db } from '@stack/db';

@Controller()
export class AppController {
  constructor() {}

  @Get('health')
  async getHealth() {
    // Quick DB ping to verify @stack/db works from the NestJS app
    const users = await db.query.users.findMany({ limit: 1 });
    return { status: 'ok', dbConnected: true };
  }
}
