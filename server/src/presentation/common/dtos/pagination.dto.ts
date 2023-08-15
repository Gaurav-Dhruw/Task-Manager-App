import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @Min(1)
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  page?: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit?: number;
}
