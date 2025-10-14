import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async getAll(pagination: PaginationDto) {
    const { limit = 10, offset = 0 } = pagination;

    try {
      return await this.taskRepository.find({
        take: limit,
        skip: offset,
      });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async getById(taskId: string) {
    try {
      const task = await this.getTaskFromDB(taskId);

      return task;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async create(createTaskDto: CreateTaskDto) {
    try {
      const newTask = this.taskRepository.create(createTaskDto);
      await this.taskRepository.save(newTask);
      return newTask;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async update(taskId: string, updatedTaskDto: UpdateTaskDto) {
    try {
      await this.getTaskFromDB(taskId);
      await this.taskRepository.update(taskId, updatedTaskDto);
      return this.taskRepository.findBy({ id: taskId });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async delete(taskId: string) {
    try {
      await this.getTaskFromDB(taskId);
      return await this.taskRepository.delete(taskId);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async getTaskFromDB(taskId: string) {
    const task = await this.taskRepository.findOneByOrFail({ id: taskId });
    return task;
  }

  private handleDBExceptions(error: any): never {
    if (error.code === '23505') {
      this.logger.error(error);
      throw new BadRequestException(error.detail);
    }

    if (error instanceof EntityNotFoundError) {
      this.logger.error(error);
      throw new NotFoundException('Task not found');
    }

    if (error.code === 'ECONNREFUSED') {
      this.logger.error((error.message = 'DB connection refused'));
      throw new InternalServerErrorException();
    }

    throw new InternalServerErrorException();
  }
}
