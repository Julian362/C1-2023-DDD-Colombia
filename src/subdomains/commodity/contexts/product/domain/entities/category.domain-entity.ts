import {
  CategoryIdValueObject,
  NameCategoryValueObject,
  DescriptionCategoryValueObject,
  StateCategoryValueObject,
} from '../value-objects/category';
import { ICategoryDomainEntity } from './interfaces/category.domain-entity.interface';
import { ItemDomainEntity } from './item.domain-entity';

/**
 *  Entidad de Dominio para Categoría.
 *
 * @export
 * @class CategoryDomainEntity
 * @implements {ICategoryDomainEntity}
 */
export class CategoryDomainEntity implements ICategoryDomainEntity {
  /**
   *  Identificador de la Categoría.
   *
   * @type {(string | CategoryIdValueObject)}
   * @memberof CategoryDomainEntity
   */
  categoryId?: string | CategoryIdValueObject;
  /**
   *  Nombre de la Categoría.
   *
   * @type {(string | NameCategoryValueObject)}
   * @memberof CategoryDomainEntity
   */
  name?: string | NameCategoryValueObject;
  /**
   *  Descripción de la Categoría.
   *
   * @type {(string | DescriptionCategoryValueObject)}
   * @memberof CategoryDomainEntity
   */
  description?: string | DescriptionCategoryValueObject;
  /**
   *  Estado de la Categoría.
   *
   * @type {(boolean | StateCategoryValueObject)}
   * @memberof CategoryDomainEntity
   */
  state?: boolean | StateCategoryValueObject;

  items?: ItemDomainEntity[];
  /**
   *  crea una instancia de CategoryDomainEntity.
   * @param {ICategoryDomainEntity} [data] Datos para la entidad.
   * @memberof CategoryDomainEntity
   */
  constructor(data?: ICategoryDomainEntity) {
    if (data?.categoryId) this.categoryId = data.categoryId;
    if (data?.name) this.name = data.name;
    if (data?.description) this.description = data.description;
    if (data?.state) this.state = data.state;
    if (data?.items) this.items = data.items as ItemDomainEntity[];
  }
}
