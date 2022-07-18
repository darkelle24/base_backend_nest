import { RolesEnum } from '@/common/roles/roles';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from './auth/other/auth.decorator';
import { CreateUserAdminDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity, UserWithoutPassword } from './entities/user.entity';
import { User } from './other/user.decorator';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @Auth(RolesEnum.Admin, RolesEnum.SuperAdmin)
  findAll(): Promise<UserWithoutPassword[]> {
    return this.usersService.findAll();
  }

  @Get(':uuid')
  @Auth(RolesEnum.Admin, RolesEnum.SuperAdmin)
  findOne(@Param('uuid') uuid: string): Promise<UserWithoutPassword> {
    return this.usersService.findOne(uuid);
  }

  @Post()
  @Auth(RolesEnum.Admin, RolesEnum.SuperAdmin)
  createUserAdmin(@Body() body: CreateUserAdminDto, @User() user: UserEntity): Promise<UserWithoutPassword> {
    if (user.role === RolesEnum.Admin && body.role === RolesEnum.SuperAdmin) {
      throw new HttpException('You don\'t have the right to access this route.', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.createAdmin(body);
  }

  @Put(':uuid')
  @Auth(RolesEnum.Admin, RolesEnum.SuperAdmin)
  async update(@Param('uuid') uuid: string, @Body() updateUserDto: UpdateUserDto, @User() user: UserEntity): Promise<UserWithoutPassword> {
    await this.usersService.checkAuth(uuid, user)
    return this.usersService.update(uuid, updateUserDto);
  }

  @Delete(':uuid')
  @Auth(RolesEnum.Admin, RolesEnum.SuperAdmin)
  async remove(@Param('uuid') uuid: string, @User() user: UserEntity) {
    await this.usersService.checkAuth(uuid, user)
    return this.usersService.remove(uuid);
  }



  @Get('me')
  @Auth()
  getMe(@User() user: UserEntity): Promise<UserWithoutPassword> {
    return this.usersService.findOne(user.id);
  }

  @Put('me')
  @Auth()
  updateMe(@User() user: UserEntity, @Body() updateUserDto: UpdateUserDto): Promise<UserWithoutPassword> {
    return this.usersService.update(user.id, updateUserDto);
  }

  @Delete('me')
  @Auth()
  removeMe(@User() user: UserEntity) {
    return this.usersService.remove(user.id);
  }
}
