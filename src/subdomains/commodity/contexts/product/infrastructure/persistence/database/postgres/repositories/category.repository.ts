import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { IBase } from './interfaces/base.interface';

export class CategoryRepository implements IBase<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repository: Repository<CategoryEntity>,
  ) {}

  async create(entity: CategoryEntity): Promise<CategoryEntity> {
    const result = await this.repository.save(entity);
    return result;
  }

  async update(id: string, entity: CategoryEntity): Promise<CategoryEntity> {
    const data = await this.repository.findOneBy({ categoryId: id });
    if (data) {
      const newEntity = {
        ...data,
        ...entity,
        id,
      };
      return await this.repository.save(newEntity);
    }
    throw new Error('category not found');
  }

  async delete(id: string): Promise<boolean> {
    const data = await this.repository.findOneBy({ categoryId: id });
    if (data) {
      await this.repository.remove(data);
      return true;
    }
    throw new Error('category not found');
  }

  async findAll(): Promise<CategoryEntity[]> {
    const result = await this.repository.find();
    return result;
  }

  async findById(id: string): Promise<CategoryEntity> {
    const result = await this.repository.findOneBy({ categoryId: id });
    if (result) {
      return result;
    }
    throw new Error('category not found');
  }
}
