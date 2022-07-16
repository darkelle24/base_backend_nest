import { RolesEnum } from './roles';
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@/api/users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    let { user } = context.switchToHttp().getRequest();

    if ((user as User).role) {
      if ((user as User).role in requiredRoles) {
        return true
      }
      throw new HttpException('You don\'t have the right to access this route.', HttpStatus.FORBIDDEN);
    }
    throw new HttpException('You don\'t have the right to access this route.', HttpStatus.FORBIDDEN);
  }
}