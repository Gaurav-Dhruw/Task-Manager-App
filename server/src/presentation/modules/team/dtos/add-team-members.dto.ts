import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { User } from 'src/domain/entities';
import { GenericEntityDTO } from 'src/presentation/common/dtos';

export class AddTeamMembersDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ValidateNested({each:true})
  @Type(()=>GenericEntityDTO)
  @IsArray()
  @ArrayMinSize(1)
  members: User[];
}

export class AddTeamMemebersResponseDto {}
