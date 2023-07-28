import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNotEmptyObject, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { Task, User } from "src/domain/entities";
import { GenericEntityDTO } from "src/presentation/common/dtos";

export class CreateCommentDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  content: string;
   
    @ValidateNested()
    @Type(()=>GenericEntityDTO)
   @IsNotEmptyObject()
   task:Task;

   @IsDate()
    @IsOptional()
   created_at?:Date;
}


