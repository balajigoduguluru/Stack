import { Controller, Post, Body } from '@nestjs/common';
import { CalculatorsService, CgpaCalculationDto, AttendanceCalculationDto } from './calculators.service';

@Controller('tools/calculators')
export class CalculatorsController {
  constructor(private readonly calculatorsService: CalculatorsService) {}

  @Post('cgpa')
  calculateCgpa(@Body() dto: CgpaCalculationDto) {
    return this.calculatorsService.calculateCgpa(dto);
  }

  @Post('attendance')
  calculateAttendance(@Body() dto: AttendanceCalculationDto) {
    return this.calculatorsService.calculateAttendance(dto);
  }
}
