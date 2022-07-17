import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { basicCreate, basicUpdate } from '@/common/fn.helper';
import { FindOptionsSelectByString, getConnection, InsertResult, QueryFailedError, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto, CreateUserAdminDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { RolesEnum } from '@/common/roles/roles';
import { AuthHelper } from './auth/other/auth.helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private configService: ConfigService,

    @Inject(AuthHelper)
    private readonly helper: AuthHelper
  ) {
    basicCreate(this.usersRepository, User, {
      username: this.configService.get<string>('FIRST_USER_USERNAME'),
      password: this.helper.encodePassword(this.configService.get<string>('FIRST_USER_PASSWORD')),
      email: this.configService.get<string>('FIRST_USER_EMAIL'),
      role: this.configService.get<RolesEnum>('FIRST_USER_ROLE'),
    }).catch((reason: QueryFailedError) => {
      if (reason instanceof QueryFailedError && reason.message.includes("duplicate key value violates unique constraint")) {
        console.log('First user already exist.')
      } else if (reason instanceof QueryFailedError) {
        console.warn(reason.message)
      }
    })
  }

  createAdmin(createUserDto: CreateUserAdminDto): Promise<User> {
    return basicCreate(this.usersRepository, User, createUserDto)
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(uuid: string): Promise<User> {
    return this.usersRepository.findOneBy({ id: uuid });
  }

  update(uuid: string, updateUserDto: UpdateUserDto): Promise<User> {
    return basicUpdate(this.usersRepository, User, uuid, updateUserDto)
  }

  async remove(uuid: string): Promise<void> {
    await this.usersRepository.delete(uuid);
  }
}
