import { CategoryDomainEntity } from '../../entities/category.domain-entity';

/**
 * interfaz para la respuesta de la obtencion de una categoria
 *
 * @export
 * @interface IGotCategoryResponse
 */
export interface IGotCategoryResponse {
  category: CategoryDomainEntity | null;
}
