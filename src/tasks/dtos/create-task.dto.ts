import {
  IsDateString,
  IsEnum,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';
import { TaskPriority } from '../enums/task-priority.enum';

export class CreateTaskDto {
  @IsString()
  @Length(3, 50)
  readonly title: string;

  @IsString()
  @Length(3, 255)
  readonly description: string;

  @IsEnum(TaskStatus)
  readonly status: TaskStatus;

  @IsEnum(TaskPriority)
  readonly priority: TaskPriority;

  @IsDateString()
  readonly dueDate: Date;

  @IsUUID('4')
  readonly userId: string;

  @IsUUID('4')
  readonly categoryId: string;
}
