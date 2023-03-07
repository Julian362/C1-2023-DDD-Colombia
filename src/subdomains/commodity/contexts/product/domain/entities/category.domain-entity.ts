import {
  CategoryIdValueObject,
  NameValueObject,
  DescriptionValueObject,
  StateValueObject,
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
  categoryId: string | CategoryIdValueObject;
  /**
   *  Nombre de la Categoría.
   *
   * @type {(string | NameValueObject)}
   * @memberof CategoryDomainEntity
   */
  name: string | NameValueObject;
  /**
   *  Descripción de la Categoría.
   *
   * @type {(string | DescriptionValueObject)}
   * @memberof CategoryDomainEntity
   */
  description: string | DescriptionValueObject;
  /**
   *  Estado de la Categoría.
   *
   * @type {(boolean | StateValueObject)}
   * @memberof CategoryDomainEntity
   */
  state: boolean | StateValueObject;

  items: ItemDomainEntity[];
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
