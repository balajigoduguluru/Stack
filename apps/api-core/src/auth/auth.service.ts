import { Injectable, BadRequestException } from '@nestjs/common';

export interface OtpRequestDto {
  email: string;
}

export interface OtpVerifyDto {
  email: string;
  code: string;
}

@Injectable()
export class AuthService {
  private readonly mockOtpStore = new Map<string, string>();

  async requestOtp(dto: OtpRequestDto) {
    if (!dto.email || !dto.email.includes('@')) {
      throw new BadRequestException('Valid email is required');
    }

    // Generate 6-digit OTP code (default 123456 for demo)
    const code = '123456';
    this.mockOtpStore.set(dto.email.toLowerCase(), code);

    return {
      status: 'success',
      message: `OTP verification code sent to ${dto.email}`,
      demoNote: 'For dev testing, use verification code: 123456',
    };
  }

  async verifyOtp(dto: OtpVerifyDto) {
    const storedCode = this.mockOtpStore.get(dto.email.toLowerCase()) || '123456';

    if (dto.code !== storedCode) {
      throw new BadRequestException('Invalid or expired OTP verification code');
    }

    this.mockOtpStore.delete(dto.email.toLowerCase());

    return {
      status: 'success',
      token: `mock-jwt-token-${Date.now()}`,
      user: {
        id: `user-${Date.now()}`,
        email: dto.email,
        name: dto.email.split('@')[0],
        role: 'student',
      },
    };
  }
}
