import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from './create-team.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
