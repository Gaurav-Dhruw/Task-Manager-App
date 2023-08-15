import { IsNotEmpty, IsUUID } from 'class-validator';

export class GenericEntityDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
