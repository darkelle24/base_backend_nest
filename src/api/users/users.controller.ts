import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from './auth/other/auth.decorator';
import { RolesEnum } from '@/common/roles/roles';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.usersService.findOne(uuid);
  }

  @Put(':uuid')
  @Auth(RolesEnum.Admin)
  update(@Param('uuid') uuid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(uuid, updateUserDto);
  }

  @Delete(':uuid')
  @Auth()
  remove(@Param('uuid') uuid: string) {
    return this.usersService.remove(uuid);
  }



  @Get('me')
  getMe(@Param('uuid') uuid: string) {
    return this.usersService.findOne(uuid);
  }

  @Put('me')
  updateMe(@Param('uuid') uuid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(uuid, updateUserDto);
  }

  @Delete('me')
  removeMe(@Param('uuid') uuid: string) {
    return this.usersService.remove(uuid);
  }
}
