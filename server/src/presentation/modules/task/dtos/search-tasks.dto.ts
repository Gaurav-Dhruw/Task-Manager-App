import { IsDateString, IsEnum, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Priority, Status } from 'src/domain/types';
import { PaginationDto } from 'src/presentation/common/dtos';

export class SearchTasksDto extends PaginationDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsEnum(Priority)
  @IsOptional()
  priority?: Priority;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;

    @IsDateString()
    @IsOptional()
  deadline?:Date

  @IsOptional()
  @IsIn(['deadline'], { each: true })
  sort?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'], { each: true })
  order?: string;
}
