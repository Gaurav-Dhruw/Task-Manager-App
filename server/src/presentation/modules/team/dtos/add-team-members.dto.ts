import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { User } from 'src/domain/entities';
import { GenericEntityDto } from 'src/presentation/common/dtos';

export class AddTeamMembersDto {


  @ValidateNested({each:true})
  @Type(()=>GenericEntityDto)
  @IsArray()
  @ArrayMinSize(1)
  members: User[];
}

export class AddTeamMemebersResponseDto {}
