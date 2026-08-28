import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RolesGuard } from './roles.guard';
import { QuotaGuard } from './quota.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, RolesGuard, QuotaGuard],
  exports: [AuthService, RolesGuard, QuotaGuard],
})
export class AuthModule {}
