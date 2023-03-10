import {
  CategoryIdValueObject,
  DescriptionCategoryValueObject,
  NameCategoryValueObject,
  StateCategoryValueObject,
} from '../../value-objects/category';
import { IItemDomainEntity } from './item.domain-entity.interface';

/**
 * Interface de Dominio para Categoría.
 *
 * @export
 * @interface ICategoryDomainEntity
 */
export interface ICategoryDomainEntity {
  /**
   * Identificador de la Categoría.
   *
   * @type {(string | CategoryIdValueObject)}
   * @memberof ICategoryDomainEntity
   */
  categoryId?: string | CategoryIdValueObject;
  /**
   * Nombre de la Categoría.
   *
   * @type {(string | NameCategoryValueObject)}
   * @memberof ICategoryDomainEntity
   */
  name?: string | NameCategoryValueObject;
  /**
   * Descripción de la Categoría.
   *
   * @type {(string | DescriptionCategoryValueObject)}
   * @memberof ICategoryDomainEntity
   */
  description?: string | DescriptionCategoryValueObject;
  /**
   * Estado de la Categoría.
   *
   * @type {(boolean | StateCategoryValueObject)}
   * @memberof ICategoryDomainEntity
   */
  state?: boolean | StateCategoryValueObject;

  /**
   *  Items de la Categoría.
   *
   * @type {(IItemDomainEntity[])}
   * @memberof ICategoryDomainEntity
   */
  items?: IItemDomainEntity[];
}
