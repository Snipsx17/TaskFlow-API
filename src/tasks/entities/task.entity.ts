import { TaskStatus } from '../enums/task-status.enum';
import { TaskPriority } from '../enums/task-priority.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from 'src/categories/entities/category.entity';

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
    default: null,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
    nullable: false,
  })
  status?: TaskStatus;

  @Column({
    type: 'enum',
    enum: TaskPriority,
    default: TaskPriority.LOW,
    nullable: false,
  })
  priority?: TaskPriority;

  @Column({
    type: 'date',
    nullable: false,
  })
  dueDate: Date;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  userId: string;

  @ManyToOne(() => CategoryEntity, (category) => category.tasks, {
    eager: true,
  })
  @JoinColumn({ name: 'category' })
  category: CategoryEntity;

  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  tags: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
