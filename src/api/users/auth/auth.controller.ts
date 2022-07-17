import { CreateUserDto } from './../dto/create-user.dto';
import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { User } from '@/api/users/entities/user.entity';
import { JwtAuthGuard } from './other/auth.guard';
import { AuthService } from './auth.service';
import { LoginDto, AuthReturnDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  readonly service: AuthService;

  @Post('register')
  register(@Body() body: CreateUserDto): Promise<AuthReturnDto> {
    return this.service.register(body)
      .then(result => this.service.login({username: result.username, password: body.password}));
  }

  @Post('login')
  login(@Body() body: LoginDto): Promise<AuthReturnDto> {
    return this.service.login(body);
  }
}
