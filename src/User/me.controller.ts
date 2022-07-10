/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Delete, Get, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user/me')
export class MeController {
  @Get()
  get() {

  }

  @Put()
  change() {

  }

  @Delete()
  delete() {

  }
}
