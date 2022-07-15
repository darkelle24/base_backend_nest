import { RolesEnum } from '../../../common/roles/roles';
import { Entity, Column, PrimaryGeneratedColumn, Unique, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
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
