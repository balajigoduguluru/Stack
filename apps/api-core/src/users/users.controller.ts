import { Controller, Get, Patch, Body, Headers } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMe(@Headers('authorization') auth: string) {
    // In a real app we'd decode JWT. Here we just mock a specific user ID for demo purposes
    // Or fetch the first user.
    return this.usersService.findMe();
  }

  @Patch('me')
  async updateMe(@Body() data: any) {
    return this.usersService.updateMe(data);
  }
}
