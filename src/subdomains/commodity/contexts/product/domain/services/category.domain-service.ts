import { CategoryDomainEntity } from '../entities/category.domain-entity';

/**
 * interface que representa el servicio de dominio de categoría
 *
 * @export
 * @interface ICategoryDomainService
 * @template Entity
 */
export interface ICategoryDomainService<
  Entity extends CategoryDomainEntity = CategoryDomainEntity,
> {
  /**
   *  obtiene una categoría
   *
   * @param {string} categoryId
   * @return {*}  {Promise<Entity>}
   * @memberof ICategoryDomainService
   */
  getCategory(categoryId: string): Promise<Entity>;
  /**
   *  cambia el nombre de la categoría
   *
   * @param {string} categoryId
   * @param {string} name
   * @return {*}  {Promise<Entity>}
   * @memberof ICategoryDomainService
   */
  changeNameCategory(categoryId: string, name: string): Promise<Entity>;
  /**
   *  cambia la descripción de la categoría
   *
   * @param {string} categoryId
   * @param {string} description
   * @return {*}  {Promise<Entity>}
   * @memberof ICategoryDomainService
   */
  changeDescriptionCategory(
    categoryId: string,
    description: string,
  ): Promise<Entity>;
  /**
   *  cambia el estado de la categoría
   *
   * @param {string} categoryId
   * @param {boolean} state
   * @return {*}  {Promise<Entity>}
   * @memberof ICategoryDomainService
   */
  changeStateCategory(categoryId: string, state: boolean): Promise<Entity>;
}
