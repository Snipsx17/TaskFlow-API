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
    const { limit = 1000, offset = 0, order = 'ASC' } = pagination;

    try {
      // method 1 without query builder
      // return await this.taskRepository.find({
      //   take: limit,
      //   skip: offset,
      //   order: {
      //     title: order as FindOptionsOrderValue,
      //   },
      // });

      //method 2 with query builder
      const query = this.taskRepository.createQueryBuilder();
      return await query
        .orderBy('title', order as 'ASC' | 'DESC')
        .limit(limit)
        .offset(offset)
        .getMany();
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

  async getByTag(tag: string, pagination: PaginationDto) {
    const { limit = 1000, offset = 0, order = 'ASC' } = pagination;
    try {
      const query = this.taskRepository.createQueryBuilder('task');
      const tasks = await query
        .where(':tag = ANY(task.tags)', { tag })
        .orderBy('title', order as 'ASC' | 'DESC')
        .limit(limit)
        .offset(offset)
        .getMany();

      return tasks;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async create(createTaskDto: CreateTaskDto) {
    try {
      const newTask = this.taskRepository.create(
        this.transformDtoToEntity(createTaskDto),
      );
      await this.taskRepository.save(newTask);
      return newTask;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async update(taskId: string, updatedTaskDto: UpdateTaskDto) {
    try {
      await this.getTaskFromDB(taskId);
      await this.taskRepository.update(
        taskId,
        this.transformDtoToEntity(updatedTaskDto),
      );
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

  private transformDtoToEntity(dto: CreateTaskDto | UpdateTaskDto) {
    return {
      ...dto,
      ...(dto.category && { category: { id: dto.category } }),
    };
  }

  private handleDBExceptions(error: any): never {
    if (error.code === '23505') {
      this.logger.error(error);
      throw new BadRequestException(
        `Title "${error.parameters[0]}" already exists.`,
      );
    }

    if (error.code === '23503') {
      this.logger.error(error);
      throw new BadRequestException(
        `Category with ID "${error.parameters[7]}" not exists.`,
      );
    }

    if (error instanceof EntityNotFoundError) {
      this.logger.error(error);
      throw new NotFoundException(
        `Task with id ${error.criteria.id} not found`,
      );
    }

    if (error.code === 'ECONNREFUSED') {
      this.logger.error((error.message = 'DB connection refused'));
      throw new InternalServerErrorException();
    }
    console.log(error);

    throw new InternalServerErrorException();
  }
}
