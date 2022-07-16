import { User } from '@/api/users/entities/user.entity';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(OmitType(User, ['password', 'email', 'role', 'id'] as const)) {
}

export class UpdateUserAdminDto extends PartialType(OmitType(User, ['id'] as const)) { }
