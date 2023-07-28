import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { User } from 'src/domain/entities';

export class AddTeamAdminsDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsArray()
  @ArrayMinSize(1)
  admins: User[];
}
