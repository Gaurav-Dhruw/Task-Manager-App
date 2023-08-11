import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from 'class-validator';
import { User } from 'src/domain/entities';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  profile_pic?: string;
}

export class UpdateUserResponseDto extends OmitType(User, [
  'password',
  'teams',
  'tasks',
]) {
  constructor(options?: Partial<User>) {
    super(options);

    this.id = options?.id ?? this.id;
    this.email = options?.email ?? this.email;
    this.name = options?.name ?? this.name;
    this.profile_pic = options?.profile_pic ? options.profile_pic : null;
  }
}


