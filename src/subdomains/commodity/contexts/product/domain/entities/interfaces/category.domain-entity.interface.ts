import {
  CategoryIdValueObject,
  DescriptionValueObject,
  NameValueObject,
  StateValueObject,
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
  categoryId: string | CategoryIdValueObject;
  /**
   * Nombre de la Categoría.
   *
   * @type {(string | NameValueObject)}
   * @memberof ICategoryDomainEntity
   */
  name: string | NameValueObject;
  /**
   * Descripción de la Categoría.
   *
   * @type {(string | DescriptionValueObject)}
   * @memberof ICategoryDomainEntity
   */
  description: string | DescriptionValueObject;
  /**
   * Estado de la Categoría.
   *
   * @type {(boolean | StateValueObject)}
   * @memberof ICategoryDomainEntity
   */
  state: boolean | StateValueObject;

  /**
   *  Items de la Categoría.
   *
   * @type {(IItemDomainEntity[])}
   * @memberof ICategoryDomainEntity
   */
  items: IItemDomainEntity[];
}
