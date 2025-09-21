import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  @Get()
  getTasks() {
    return 'This will return all tasks';
  }

  @Get(':id')
  getTasksById(@Param('id') id: string) {
    return 'This will return a task by ID';
  }

  @Post()
  createTask() {
    return 'This will create a new task';
  }

  @Put(':id')
  updateTask(@Param('id') id: string) {
    return 'This will update a task';
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return 'This will delete a task';
  }

  @Patch(':id')
  updateTaskStatus(@Param('id') id: string) {
    return 'This will update a task status';
  }
}
