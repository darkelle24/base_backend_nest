/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  @Post('login')
  login(): any{

  }

  @Post('register')
  register() {

  }

  @Get()
  getAll() {
    
  }

  @Post()
  add() {
    
  }

  @Put(':id')
  change() {
    
  }

  @Delete(':id')
  delete(): any {
    
  }
}
