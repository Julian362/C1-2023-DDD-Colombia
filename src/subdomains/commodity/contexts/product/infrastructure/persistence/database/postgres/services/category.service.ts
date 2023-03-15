import { CategoryDomainEntity } from '@context/product/domain/entities';
import { ICategoryDomainService } from '@context/product/domain/services';
import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryRepository } from '../repositories/category.repository';

/**
 * clase que representa el servicio de dominio de categoría
 *
 * @export
 * @class CategoryService
 * @implements {ICategoryDomainService}
 */
@Injectable()
export class CategoryService implements ICategoryDomainService {
  /**
   * Crea una instancia de CategoryService.
   * @param {CategoryRepository} categoryRepository
   * @memberof CategoryService
   */
  constructor(private readonly categoryRepository: CategoryRepository) {}
  /**
   * obtiene una categoría
   *
   * @param {string} categoryId id de la categoría
   * @return {Promise<CategoryDomainEntity>} retorna una promesa con la categoría
   * @memberof CategoryService
   */
  getCategory(categoryId: string): Promise<CategoryDomainEntity> {
    return this.categoryRepository.findById(categoryId);
  }
  /**
   * cambia el nombre de la categoría
   *
   * @param {string} categoryId id de la categoría
   * @param {string} name nombre de la categoría
   * @return {Promise<CategoryDomainEntity>} retorna una promesa con la categoría
   * @memberof CategoryService
   */
  changeNameCategory(
    categoryId: string,
    name: string,
  ): Promise<CategoryDomainEntity> {
    const data = new CategoryEntity();
    data.name = name;
    return this.categoryRepository.update(categoryId, data);
  }
  /**
   * cambia la descripción de la categoría
   *
   * @param {string} categoryId id de la categoría
   * @param {string} description descripción de la categoría
   * @return {Promise<CategoryDomainEntity>} retorna una promesa con la categoría
   * @memberof CategoryService
   */
  changeDescriptionCategory(
    categoryId: string,
    description: string,
  ): Promise<CategoryDomainEntity> {
    const data = new CategoryEntity();
    data.description = description;
    return this.categoryRepository.update(categoryId, data);
  }
  /**
   * cambia el estado de la categoría
   *
   * @param {string} categoryId id de la categoría
   * @param {boolean} state estado de la categoría
   * @return {Promise<CategoryDomainEntity>} retorna una promesa con la categoría
   * @memberof CategoryService
   */
  changeStateCategory(
    categoryId: string,
    state: boolean,
  ): Promise<CategoryDomainEntity> {
    const data = new CategoryEntity();
    data.state = state;
    return this.categoryRepository.update(categoryId, data);
  }
}
