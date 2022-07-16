import { RolesEnum } from '@Helper/roles/roles';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth.guard';
import { ApiBearerAuth, ApiForbiddenResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RolesGuard } from '@Helper/roles/roles.guard';

/**
 * Decorator that check if the user is logged and check if it as a valid role to access this route
 *
 * @param roles roles to access this route
 *
 * @publicApi
 */
export function Auth(...roles: RolesEnum[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'You need to be logged to access this route.' }),
    ApiForbiddenResponse({ description: 'You don\'t have the right to access this route.'})
  );
}