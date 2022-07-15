import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { basicCreate, basicUpdate } from '@/common/fn.helper';
import { FindOptionsSelectByString, getConnection, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User | void> {
    return basicCreate(this.usersRepository, User, createUserDto)
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(uuid: string): Promise<User> {
    return this.usersRepository.findOneBy({ id: uuid });
  }

  update(uuid: string, updateUserDto: UpdateUserDto): Promise<User | void> {
    return basicUpdate(this.usersRepository, User, uuid, updateUserDto)
  }

  async remove(uuid: string): Promise<void> {
    await this.usersRepository.delete(uuid);
  }
}
