import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { MockAuthGuard } from '../notes/notes.controller';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('admin')
@UseGuards(MockAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('metrics')
  @Roles('admin', 'student') // Allow student role in dev for testing dashboard
  getMetrics() {
    return this.adminService.getMetrics();
  }
}
