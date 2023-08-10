import { IsNotEmpty, IsNotIn, IsOptional, IsString } from 'class-validator';
import { Team, User } from 'src/domain/entities';

export class CreateTeamDto {

  @IsString()
  @IsNotEmpty()
  team_name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  display_pic?: string;
}

export class CreateTeamResponseDto {
  id: string;
  team_name: string;
  display_pic?: string;
  admins: User[];
  members: User[];

  constructor(data?: Partial<Team>) {
    Object.assign(this, data);
  }
}
