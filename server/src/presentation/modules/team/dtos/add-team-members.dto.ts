import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { User } from 'src/domain/entities';

export class AddTeamMembersDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsArray()
  @ArrayMinSize(1)
  members: User[];
}

export class AddTeamMemebersResponseDto {}
