import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ParseUuidV4Pipe } from 'src/common/pipes/parse-uuidv4.pipe';

@Controller('tasks')
export class TasksController {
  @Get()
  getTasks() {
    return 'This will return all tasks';
  }

  @Get(':id')
  getTasksById(@Param('id', ParseUuidV4Pipe) id: string) {
    return 'This will return a task by ID';
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createTask() {
    return 'This will create a new task';
  }

  @Put(':id')
  updateTask(@Param('id', ParseUuidV4Pipe) id: string) {
    return 'This will update a task';
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTask(@Param('id', ParseUuidV4Pipe) id: string) {
    return 'This will delete a task';
  }

  @Patch(':id/status')
  updateTaskStatus(@Param('id', ParseUuidV4Pipe) id: string) {
    return 'This will update a task status';
  }
}
