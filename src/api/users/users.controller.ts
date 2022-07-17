import { CreateUserAdminDto } from './dto/create-user.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from './auth/other/auth.decorator';
import { RolesEnum } from '@/common/roles/roles';
import { UserWithoutPassword } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @ApiOperation({ description: "dab"})
  findAll(): Promise<UserWithoutPassword[]> {
    return this.usersService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string): Promise<UserWithoutPassword> {
    return this.usersService.findOne(uuid);
  }

  @Post()
  @Auth(RolesEnum.Admin, RolesEnum.SuperAdmin)
  createUserAdmin(@Body() body: CreateUserAdminDto): Promise<UserWithoutPassword> {
    return this.usersService.createAdmin(body);
  }

  @Put(':uuid')
  @Auth(RolesEnum.Admin, RolesEnum.SuperAdmin)
  update(@Param('uuid') uuid: string, @Body() updateUserDto: UpdateUserDto): Promise<UserWithoutPassword> {
    return this.usersService.update(uuid, updateUserDto);
  }

  @Delete(':uuid')
  @Auth(RolesEnum.Admin, RolesEnum.SuperAdmin)
  remove(@Param('uuid') uuid: string) {
    return this.usersService.remove(uuid);
  }



  @Get('me')
  @Auth()
  getMe(@Param('uuid') uuid: string): Promise<UserWithoutPassword> {
    return this.usersService.findOne(uuid);
  }

  @Put('me')
  @Auth()
  updateMe(@Param('uuid') uuid: string, @Body() updateUserDto: UpdateUserDto): Promise<UserWithoutPassword> {
    return this.usersService.update(uuid, updateUserDto);
  }

  @Delete('me')
  @Auth()
  removeMe(@Param('uuid') uuid: string) {
    return this.usersService.remove(uuid);
  }
}
