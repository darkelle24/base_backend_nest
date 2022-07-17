import { CreateUserDto } from './../dto/create-user.dto';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/api/users/entities/user.entity';
import { FindOptionsSelectByString, Repository } from 'typeorm';
import { LoginDto, AuthReturnDto } from './dto/login.dto';
import { AuthHelper } from './other/auth.helper';
import { basicCreate } from '@/common/fn.helper';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,

    @Inject(AuthHelper)
    private readonly helper: AuthHelper
  ) {}

  userEntities: string[] = this.repository.metadata.ownColumns.map(column => column.propertyName)

  public async register(body: CreateUserDto): Promise<User> {
    const { username, email, password }: CreateUserDto = body;

    let user = new User();

    user.username = username;
    user.email = email;
    user.password = this.helper.encodePassword(password);

    return basicCreate(this.repository, User, user).then((value) => {
      if (value)
        delete value.password
      return value
    })
  }

  private findOneUserWithPassword(usernameOrEmail: string): Promise<User> {
    return this.repository.findOne({ where: [{ username: usernameOrEmail }, { email: usernameOrEmail}], select: (this.userEntities as FindOptionsSelectByString<User>)})
  }

  public async login(body: LoginDto): Promise<AuthReturnDto> {
    const { username, password }: LoginDto = body;
    const user: User = await this.findOneUserWithPassword(username);

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const token = await this.helper.generateToken(user)

    let toReturn: any = {}

    toReturn = user
    toReturn.token = token
    delete toReturn.password

    return toReturn;
  }
}