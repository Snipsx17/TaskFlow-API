import { IsIn, IsOptional, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @IsPositive({ message: 'Limit should be greater than 0' })
  @Type(() => Number) // convert to number
  limit?: number;

  @IsOptional()
  @Min(0, { message: 'Offset should be greater than or equal to 0' })
  @Type(() => Number) // convert to number
  offset?: number;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: string;
}
