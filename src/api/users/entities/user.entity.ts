import { Entity, Column, PrimaryGeneratedColumn, Unique, BaseEntity } from 'typeorm';
import { OmitType } from '@nestjs/swagger';
import { RolesEnum } from '@Helper/roles/roles';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({unique: true})
  username: string

  @Column({select: false})
  password: string

  @Column({unique: true})
  email: string

  @Column({
    type: 'enum',
    enum: RolesEnum,
    default: RolesEnum.User
  })
  role: RolesEnum
}

export class UserWithoutPassword extends OmitType(UserEntity, ['password'] as const) {
}
