import { CategoryDomainEntity } from '../../entities/category.domain-entity';

/**
 * interfaz para la respuesta de la obtencion de una categoria
 *
 * @export
 * @interface IGotCategoryResponse
 */
export interface IGotCategoryResponse {
  /**
   * categoria obtenida
   *
   * @type {(CategoryDomainEntity | null)}
   * @memberof IGotCategoryResponse
   */
  category: CategoryDomainEntity | null;
}
