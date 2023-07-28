import { IsNotEmpty, IsUUID } from 'class-validator';

export class GenericEntityDTO {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
