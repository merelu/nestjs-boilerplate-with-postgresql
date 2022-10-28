import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';
import { JwtRefreshGuard } from '../guards/jwt.refresh.guard';
import { LoginGuard } from '../guards/login.guard';

export function AuthJwt() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function AuthRefreshJwt() {
  return applyDecorators(UseGuards(JwtRefreshGuard));
}

export function AuthLogin() {
  return applyDecorators(UseGuards(LoginGuard));
}
