import { CreateUserDto } from './../dto/create-user.dto';
import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { User } from '@/api/users/entities/user.entity';
import { JwtAuthGuard } from './other/auth.guard';
import { AuthService } from './auth.service';
import { LoginDto, LoginReturnDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  readonly service: AuthService;

  @Post('register')
  register(@Body() body: CreateUserDto): Promise<User | void> {
    return this.service.register(body);
  }

  @Post('login')
  login(@Body() body: LoginDto): Promise<LoginReturnDto | void> {
    return this.service.login(body);
  }
}
