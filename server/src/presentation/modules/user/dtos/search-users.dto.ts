import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from 'src/presentation/common/dtos';

export class SearchUsersDto extends PaginationDto {
  @IsString()
  @IsNotEmpty()
  search: string;
}
