import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { TaskStatus } from 'src/tasks/enums/task-status.enum';

@Injectable()
export class ParseTaskStatusPipe implements PipeTransform {
  transform(value: string) {
    const taskStatusOptions = Object.values(TaskStatus);

    if (!taskStatusOptions.includes(value as TaskStatus)) {
      throw new BadRequestException(
        `Invalid task status, task status need to be one of these options: ${taskStatusOptions.join(', ')}.`,
      );
    }
    return value;
  }
}
