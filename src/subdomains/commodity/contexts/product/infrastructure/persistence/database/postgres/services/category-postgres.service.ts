import { ICategoryDomainService } from '@context/product/domain/services';
import { Injectable } from '@nestjs/common';
import { CategoryPostgresEntity } from '../entities/category-postgres.entity';
import { CategoryRepository } from '../repositories/category.repository';

/**
 * clase que representa el servicio de dominio de categoría
 *
 * @export
 * @class CategoryPostgresService
 * @implements {ICategoryDomainService}
 */
@Injectable()
export class CategoryPostgresService
  implements ICategoryDomainService<CategoryPostgresEntity>
{
  /**
   * Crea una instancia de CategoryPostgresService.
   * @param {CategoryRepository} categoryRepository
   * @memberof CategoryPostgresService
   */
  constructor(private readonly categoryRepository: CategoryRepository) {}
  /**
   * crea una categoría
   *
   * @param {CategoryPostgresEntity} category categoría a crear
   * @return {Promise<CategoryPostgresEntity>} retorna una promesa con la categoría
   * @memberof CategoryPostgresService
   */
  createCategory(
    category: CategoryPostgresEntity,
  ): Promise<CategoryPostgresEntity> {
    return this.categoryRepository.create(category);
  }
  /**
   * obtiene una categoría
   *
   * @param {string} categoryId id de la categoría
   * @return {Promise<CategoryPostgresEntity>} retorna una promesa con la categoría
   * @memberof CategoryPostgresService
   */
  getCategory(categoryId: string): Promise<CategoryPostgresEntity> {
    return this.categoryRepository.findById(categoryId);
  }
  /**
   * cambia el nombre de la categoría
   *
   * @param {string} categoryId id de la categoría
   * @param {string} name nombre de la categoría
   * @return {Promise<CategoryPostgresEntity>} retorna una promesa con la categoría
   * @memberof CategoryPostgresService
   */
  changeNameCategory(
    categoryId: string,
    name: string,
  ): Promise<CategoryPostgresEntity> {
    const data = new CategoryPostgresEntity();
    data.name = name;
    return this.categoryRepository.update(categoryId, data);
  }
  /**
   * cambia la descripción de la categoría
   *
   * @param {string} categoryId id de la categoría
   * @param {string} description descripción de la categoría
   * @return {Promise<CategoryPostgresEntity>} retorna una promesa con la categoría
   * @memberof CategoryPostgresService
   */
  changeDescriptionCategory(
    categoryId: string,
    description: string,
  ): Promise<CategoryPostgresEntity> {
    const data = new CategoryPostgresEntity();
    data.description = description;
    return this.categoryRepository.update(categoryId, data);
  }
  /**
   * cambia el estado de la categoría
   *
   * @param {string} categoryId id de la categoría
   * @param {boolean} state estado de la categoría
   * @return {Promise<CategoryPostgresEntity>} retorna una promesa con la categoría
   * @memberof CategoryPostgresService
   */
  changeStateCategory(
    categoryId: string,
    state: boolean,
  ): Promise<CategoryPostgresEntity> {
    const data = new CategoryPostgresEntity();
    data.state = state;
    return this.categoryRepository.update(categoryId, data);
  }
}
