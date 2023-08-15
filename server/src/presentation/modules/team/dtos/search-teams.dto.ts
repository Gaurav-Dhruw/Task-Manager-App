import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/presentation/common/dtos';

export class SearchTeamsDto extends PaginationDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  search?: string;

  @IsOptional()
  @IsIn(['team_name'], { each: true })
  sort?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'], { each: true })
  order?: string;
}
