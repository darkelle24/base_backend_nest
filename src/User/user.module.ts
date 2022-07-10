/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MeController } from './me.controller';
import { UserController } from './user.controller';

@Module({
    imports: [],
    controllers: [MeController, UserController],
    providers: [],
})
export class UserModule {}
