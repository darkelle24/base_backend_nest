import { PartialType } from '@nestjs/swagger';
import { CreateUserDto, CreateUserAdminDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) { }

export class UpdateUserAdminDto extends PartialType(CreateUserAdminDto) { }
