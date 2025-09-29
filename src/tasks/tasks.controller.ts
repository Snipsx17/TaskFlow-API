import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ParseUuidV4Pipe } from 'src/common/pipes/parse-uuidv4.pipe';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { ParseTaskStatusPipe } from 'src/common/pipes/parse-task-status.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks() {
    return await this.tasksService.getAll();
  }

  @Get(':id')
  async getTasksById(@Param('id', ParseUuidV4Pipe) id: string) {
    return await this.tasksService.getById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.create(createTaskDto);
  }

  @Put(':id')
  async updateTask(
    @Param('id', ParseUuidV4Pipe) id: string,
    @Body() updatedTaskDto: UpdateTaskDto,
  ) {
    return await this.tasksService.update(id, updatedTaskDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteTask(@Param('id', ParseUuidV4Pipe) id: string) {
    return await this.tasksService.delete(id);
  }

  @Patch(':id/status')
  async updateTaskStatus(
    @Param('id', ParseUuidV4Pipe) id: string,
    @Query('new-status', ParseTaskStatusPipe) newStatus: string,
  ) {
    return await this.tasksService.updateStatus(id, newStatus);
  }
}
