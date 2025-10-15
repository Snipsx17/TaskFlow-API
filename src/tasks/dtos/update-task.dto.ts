import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';
import { TaskPriority } from '../enums/task-priority.enum';

export class UpdateTaskDto {
  @IsString()
  @Length(3, 50)
  @IsOptional()
  readonly title?: string;

  @IsString()
  @Length(3, 255)
  @IsOptional()
  readonly description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  readonly status?: TaskStatus;

  @IsEnum(TaskPriority)
  @IsOptional()
  readonly priority?: TaskPriority;

  @IsDateString()
  @IsOptional()
  readonly dueDate?: Date;

  @IsUUID('4')
  @IsOptional()
  readonly categoryId?: string;
}
