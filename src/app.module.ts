import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [TasksModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
