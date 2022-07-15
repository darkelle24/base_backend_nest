import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { User } from '@/api/users/entities/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  public handleRequest(err: unknown, user: User): any {
    return user;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const req = context.switchToHttp().getRequest();

    return req.user ? true : false;
  }
}
