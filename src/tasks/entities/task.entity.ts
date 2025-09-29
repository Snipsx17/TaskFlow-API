import { Length, IsDate, IsUUID, IsString, IsEnum } from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';
import { TaskPriority } from '../enums/task-priority.enum';

export class TaskEntity {
  @IsUUID('4')
  id: string;

  @IsString()
  @Length(3, 50)
  title: string;

  @IsString()
  @Length(3, 255)
  description: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @IsDate()
  dueDate: Date;

  @IsUUID('4')
  userId: string;

  @IsUUID('4')
  categoryId: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
