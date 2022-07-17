import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"
import { User } from '@/api/users/entities/user.entity';
import { OmitType } from "@nestjs/swagger";

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  password: string

  @IsNotEmpty()
  @IsString()
  username: string
}

export class AuthReturnDto extends OmitType(User, ["password"] as const) {
  token: string
}