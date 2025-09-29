import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TaskEntity } from '../entities/task.entity';
import { TaskStatus } from '../enums/task-status.enum';
import { UpdateTaskDto } from '../dtos/update-task.dto';

@Injectable()
export class TasksRepository {
  private DB: Map<string, TaskEntity[]> = new Map();

  constructor() {
    this.DB.set('tasks', []);
  }

  async getAll() {
    return await new Promise((resolve, reject) => {
      const tasks = this.getTask();
      if (!tasks) {
        reject(new NotFoundException());
      }
      resolve(this.DB.get('tasks'));
    });
  }

  async getById(taskId: string) {
    return await new Promise((resolve, reject) => {
      const task = this.getTaskById(taskId);
      if (!task) {
        reject(new NotFoundException('Task not found.'));
      }
      resolve(task);
    });
  }

  async create(newTask: TaskEntity) {
    return await new Promise((resolve, reject) => {
      const tasks = this.getTask();
      if (!tasks) {
        reject(new BadRequestException());
      }
      tasks.push(newTask);
      this.DB.set('tasks', tasks);
      resolve(newTask);
    });
  }

  async update(taskId: string, updatedTask: UpdateTaskDto) {
    return await new Promise((resolve, reject) => {
      const tasks = this.getTask();
      if (!tasks) {
        reject(new BadRequestException());
      }
      const taskIndex = tasks.findIndex((task) => task.id === taskId);
      if (taskIndex === -1) {
        reject(new NotFoundException('Task not found.'));
      }
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...updatedTask,
        updatedAt: new Date(),
      };
      resolve(tasks[taskIndex]);
    });
  }

  async delete(taskId: string) {
    return await new Promise((resolve, reject) => {
      const tasks = this.getTask();
      if (!tasks) {
        reject(new BadRequestException());
      }
      const taskIndex = tasks.findIndex((task) => task.id === taskId);
      if (taskIndex === -1) {
        reject(new NotFoundException('Task not found.'));
      }
      tasks.splice(taskIndex, 1);
      resolve(null);
    });
  }

  async updateStatus(taskId: string, newStatus: string) {
    return await new Promise((resolve, reject) => {
      const tasks = this.getTask();
      if (!tasks) {
        reject(new BadRequestException());
      }
      const taskIndex = this.getTaskIndex(taskId);
      if (taskIndex === -1) {
        reject(new NotFoundException('Task not found.'));
      }
      tasks[taskIndex].status = newStatus as TaskStatus;
      resolve(tasks[taskIndex]);
    });
  }

  private getTask() {
    return this.DB.get('tasks');
  }

  private getTaskById(id: string) {
    return this.DB.get('tasks').find((task) => task.id === id);
  }

  private getTaskIndex(id: string) {
    return this.DB.get('tasks').findIndex((task) => task.id === id);
  }
}
