import { Injectable } from '@nestjs/common';
import { TasksRepository } from './repositories/tasks.repository';
import { CreateTaskDto } from './dtos/create-task.dto';
import { v4 as UUID } from 'uuid';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async getAll() {
    return await this.tasksRepository.getAll();
  }

  async getById(taskId: string) {
    return await this.tasksRepository.getById(taskId);
  }

  async create(createTaskDto: CreateTaskDto) {
    const task = {
      id: UUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...createTaskDto,
    };
    return await this.tasksRepository.create(task);
  }

  async update(taskId: string, updatedTaskDto: UpdateTaskDto) {
    return await this.tasksRepository.update(taskId, updatedTaskDto);
  }

  async delete(taskId: string) {
    return await this.tasksRepository.delete(taskId);
  }

  async updateStatus(taskId: string, newStatus: string) {
    return await this.tasksRepository.updateStatus(taskId, newStatus);
  }
}
