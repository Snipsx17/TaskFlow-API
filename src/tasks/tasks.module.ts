import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './repositories/tasks.repository';
import { TaskEntity } from './entities/task.entity';

@Module({
  providers: [TasksService, TasksRepository],
  controllers: [TasksController],
  imports: [TypeOrmModule.forFeature([TaskEntity])],
})
export class TasksModule {}
