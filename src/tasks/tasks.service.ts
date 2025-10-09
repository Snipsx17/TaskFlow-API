import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { TaskStatus } from './enums/task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async getAll() {
    return await this.taskRepository.find();
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

  async updateStatus(taskId: string, newStatus: TaskStatus) {
    try {
      const task = await this.getTaskFromDB(taskId);

      task[0].status = newStatus;
      await this.taskRepository.save(task[0]);

      return task;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async getTaskFromDB(taskId: string) {
    const task = await this.taskRepository.findOneByOrFail({ id: taskId });

    return task;
  }

  private handleDBExceptions(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    if (error instanceof EntityNotFoundError)
      throw new NotFoundException('Task not found');

    throw new InternalServerErrorException();
  }
}
