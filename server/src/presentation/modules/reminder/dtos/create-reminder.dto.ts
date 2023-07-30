import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsNotEmptyObject, ValidateNested, ArrayMinSize } from "class-validator";
import { Task, User } from "src/domain/entities";
import { GenericEntityDto} from "src/presentation/common/dtos";


export class createReminderDto {
  @ValidateNested()
  @Type(() => GenericEntityDto)
  @IsNotEmptyObject()
  task: Task;

  @IsDate()
  @IsNotEmpty()
  schedule_for: Date;

  @ValidateNested({each:true})
  @Type(() => GenericEntityDto)
  @ArrayMinSize(1)
  @IsArray()
  receivers: User[];
}