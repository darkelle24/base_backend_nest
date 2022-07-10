import { Roles } from './roles';
import { Entity, Column, PrimaryGeneratedColumn, Unique, BaseEntity } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(["username", "email"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string

  @Column()
  email: string

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.User
  })
  roles: Roles
}
