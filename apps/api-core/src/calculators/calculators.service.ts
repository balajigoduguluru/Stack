import { Injectable } from '@nestjs/common';

export interface CourseGradeInput {
  name?: string;
  credits: number;
  gradePoint: number; // e.g. 10 for S/O, 9 for A+, 8 for A, etc.
}

export interface CgpaCalculationDto {
  currentCgpa?: number;
  completedCredits?: number;
  courses: CourseGradeInput[];
}

export interface AttendanceCalculationDto {
  attendedClasses: number;
  totalClasses: number;
  targetPercentage?: number; // default 75
}

@Injectable()
export class CalculatorsService {
  calculateCgpa(dto: CgpaCalculationDto) {
    let totalGradePoints = 0;
    let totalSemesterCredits = 0;

    for (const course of dto.courses) {
      const credits = Number(course.credits) || 0;
      const points = Number(course.gradePoint) || 0;
      totalGradePoints += credits * points;
      totalSemesterCredits += credits;
    }

    const sgpa = totalSemesterCredits > 0 ? totalGradePoints / totalSemesterCredits : 0;

    let overallCgpa = sgpa;
    let overallCredits = totalSemesterCredits;

    if (dto.currentCgpa !== undefined && dto.completedCredits !== undefined && dto.completedCredits > 0) {
      const pastPoints = dto.currentCgpa * dto.completedCredits;
      overallCredits = dto.completedCredits + totalSemesterCredits;
      overallCgpa = overallCredits > 0 ? (pastPoints + totalGradePoints) / overallCredits : 0;
    }

    return {
      status: 'success',
      sgpa: Number(sgpa.toFixed(2)),
      overallCgpa: Number(overallCgpa.toFixed(2)),
      totalSemesterCredits,
      overallCredits,
    };
  }

  calculateAttendance(dto: AttendanceCalculationDto) {
    const attended = Number(dto.attendedClasses) || 0;
    const total = Number(dto.totalClasses) || 0;
    const target = Number(dto.targetPercentage) || 75;

    if (total === 0) {
      return {
        status: 'success',
        currentPercentage: 0,
        targetPercentage: target,
        statusMessage: 'No classes held yet.',
        bunksAvailable: 0,
        classesNeeded: 0,
      };
    }

    const currentPercentage = (attended / total) * 100;

    let bunksAvailable = 0;
    let classesNeeded = 0;

    if (currentPercentage >= target) {
      // Calculate how many future classes can be missed while staying >= target
      // (attended) / (total + x) >= target / 100 => total + x <= attended * 100 / target
      bunksAvailable = Math.floor((attended * 100) / target - total);
    } else {
      // Calculate how many consecutive classes must be attended to reach target %
      // (attended + x) / (total + x) >= target / 100 => 100*attended + 100*x >= target*total + target*x
      // x * (100 - target) >= target*total - 100*attended
      const numerator = target * total - 100 * attended;
      const denominator = 100 - target;
      classesNeeded = denominator > 0 ? Math.ceil(numerator / denominator) : 0;
    }

    return {
      status: 'success',
      currentPercentage: Number(currentPercentage.toFixed(2)),
      targetPercentage: target,
      isOnTrack: currentPercentage >= target,
      bunksAvailable: Math.max(0, bunksAvailable),
      classesNeeded: Math.max(0, classesNeeded),
      statusMessage: currentPercentage >= target
        ? `You are on track! You can miss up to ${Math.max(0, bunksAvailable)} upcoming class(es) while maintaining ${target}%.`
        : `You need to attend the next ${Math.max(0, classesNeeded)} consecutive class(es) to reach ${target}%.`
    };
  }
}
