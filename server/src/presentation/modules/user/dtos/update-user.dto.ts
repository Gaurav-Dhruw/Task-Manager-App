import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { RegisterUserDto } from '../../auth/dtos/register-user.dto';
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

export class UpdateUserResponseDto extends OmitType(User, ['password','teams','tasks']) {
  constructor(options?: Partial<User>) {
    super(options);

    this.id = options?.id ?? this.id;
    this.email = options?.email ?? this.email;
    this.name = options?.name ?? this.name;
    this.profile_pic = options?.profile_pic ? options.profile_pic : null;
  }
}

export class UpdateUserCredentialsDto extends PartialType(
  OmitType(RegisterUserDto, ['name']),
) {}
