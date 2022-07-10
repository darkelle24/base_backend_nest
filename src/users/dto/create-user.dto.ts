import { Roles } from './../entities/roles';
import { PartialType } from "@nestjs/mapped-types"
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  username: string

  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  password: string

  @IsNotEmpty()
  @IsEmail()
  email: string
}

export class CreateUserAdminDto extends CreateUserDto {
  @IsEnum(Roles)
  @IsOptional()
  role: Roles
}
