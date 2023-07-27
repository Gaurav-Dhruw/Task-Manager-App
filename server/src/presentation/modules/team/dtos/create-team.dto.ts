import { OmitType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString } from "class-validator";
import { Team, User } from "src/domain/entities";


export class CreateTeamDto {
    @IsString()
    @IsNotEmpty()
    team_name: string;
}

export class CreateTeamResponseDto {
  team_name: string;
  display_pic?:string;
  admins:User[];
  members:User[];

  constructor(data?:Partial<Team>){
    Object.assign(this, data);
  }
}