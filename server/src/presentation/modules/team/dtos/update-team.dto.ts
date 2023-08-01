import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from './create-team.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { Team } from 'src/domain/entities';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class UpdateTeamResponseDto extends OmitType(Team,['tasks','admins','members']){

  constructor(options?:Partial<Team>){
    super();

    this.id = options?.id ?? this.id;
    this.team_name = options?.team_name ?? this.team_name;
    this.display_pic = options?.display_pic ? options.display_pic : null;
  }
}
