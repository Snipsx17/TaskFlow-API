import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class CategoriesService {
  logger = new Logger('CategoriesService');

  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.save(newCategory);
      return newCategory;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(pagination: PaginationDto) {
    const { limit = 1000, offset = 0, order = 'ASC' } = pagination;
    try {
      const query = this.categoryRepository.createQueryBuilder('category');
      const categories = await query
        .orderBy('name', order as 'ASC' | 'DESC')
        .limit(limit)
        .offset(offset)
        .getMany();

      return categories;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(categoryId: string) {
    try {
      const task = await this.getCategoryFromDB(categoryId);

      return task;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async update(categoryId: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      await this.getCategoryFromDB(categoryId);
      await this.categoryRepository.update(categoryId, updateCategoryDto);
      return this.categoryRepository.findBy({ id: categoryId });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    await this.getCategoryFromDB(id);
    return await this.categoryRepository.delete(id);
  }

  private handleDBExceptions(error: any): never {
    if (error.code === '23505') {
      this.logger.error(error);
      throw new BadRequestException(
        `Category "${error.parameters[0]}" already exists.`,
      );
    }

    if (error instanceof EntityNotFoundError) {
      this.logger.error(error);
      throw new NotFoundException(
        `Category with id ${error.criteria.id} not found`,
      );
    }

    if (error.code === 'ECONNREFUSED') {
      this.logger.error((error.message = 'DB connection refused'));
      throw new InternalServerErrorException();
    }
    console.log(error);

    throw new InternalServerErrorException();
  }

  async getCategoryFromDB(categoryId: string) {
    const task = await this.categoryRepository.findOneByOrFail({
      id: categoryId,
    });
    return task;
  }
}
