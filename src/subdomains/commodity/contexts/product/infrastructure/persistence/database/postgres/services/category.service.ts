import { CategoryDomainEntity } from '@context/product/domain/entities';
import { ICategoryDomainService } from '@context/product/domain/services';
import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class CategoryService implements ICategoryDomainService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  getCategory(categoryId: string): Promise<CategoryDomainEntity> {
    return this.categoryRepository.findById(categoryId);
  }
  changeNameCategory(
    categoryId: string,
    name: string,
  ): Promise<CategoryDomainEntity> {
    const data = new CategoryEntity();
    data.name = name;
    return this.categoryRepository.update(categoryId, data);
  }
  changeDescriptionCategory(
    categoryId: string,
    description: string,
  ): Promise<CategoryDomainEntity> {
    const data = new CategoryEntity();
    data.description = description;
    return this.categoryRepository.update(categoryId, data);
  }
  changeStateCategory(
    categoryId: string,
    state: boolean,
  ): Promise<CategoryDomainEntity> {
    const data = new CategoryEntity();
    data.state = state;
    return this.categoryRepository.update(categoryId, data);
  }
}
