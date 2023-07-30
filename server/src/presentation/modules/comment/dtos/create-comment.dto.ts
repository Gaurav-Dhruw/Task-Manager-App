import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNotEmptyObject, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { Task, User } from "src/domain/entities";
import { GenericEntityDto } from "src/presentation/common/dtos";

export class CreateCommentDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  content: string;
   
    @ValidateNested()
    @Type(()=>GenericEntityDto)
   @IsNotEmptyObject()
   task:Task;

   @IsDate()
    @IsOptional()
   created_at?:Date;
}


