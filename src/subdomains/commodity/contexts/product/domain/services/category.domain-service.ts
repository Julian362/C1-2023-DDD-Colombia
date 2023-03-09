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
   * @param {string} categoryId id de la categoría
   * @return {Promise<Entity>}  retorna una promesa con la categoría
   * @memberof ICategoryDomainService
   */
  getCategory(categoryId: string): Promise<Entity>;

  /**
   *  cambia el nombre de la categoría
   *
   * @param {string} categoryId id de la categoría
   * @param {string} name nombre de la categoría
   * @return {Promise<Entity>} retorna una promesa con la categoría
   * @memberof ICategoryDomainService
   */
  changeNameCategory(categoryId: string, name: string): Promise<Entity>;
  /**
   *  cambia la descripción de la categoría
   *
   * @param {string} categoryId id de la categoría
   * @param {string} description  descripción de la categoría
   * @return {Promise<Entity>}  retorna una promesa con la categoría
   * @memberof ICategoryDomainService
   */
  changeDescriptionCategory(
    categoryId: string,
    description: string,
  ): Promise<Entity>;
  /**
   * cambia el estado de la categoría
   *
   * @param {string} categoryId id de la categoría
   * @param {boolean} state estado de la categoría
   * @return {Promise<Entity>}  retorna una promesa con la categoría
   * @memberof ICategoryDomainService
   */
  changeStateCategory(categoryId: string, state: boolean): Promise<Entity>;
}
