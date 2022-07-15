import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"
import { User } from '@/api/users/entities/user.entity';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  password: string

  @IsNotEmpty()
  @IsString()
  username: string
}

export interface LoginReturnDto extends Omit<User, "password"> {
  toke: string
}