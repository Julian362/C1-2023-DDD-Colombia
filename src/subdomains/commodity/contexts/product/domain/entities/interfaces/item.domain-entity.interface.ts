import { ISellerDomainEntity } from './seller.domain-entity.interface';
import {
  DescriptionValueObject,
  ImageValueObject,
  ItemIdValueObject,
  NameValueObject,
  PriceValueObject,
  StateValueObject,
} from '../../value-objects/item';
import { ICategoryDomainEntity } from './category.domain-entity.interface';

/**
 * Interface de Dominio para Item.
 *
 * @export
 * @interface IItemDomainEntity
 */
export interface IItemDomainEntity {
  /**
   * Identificador del Item.
   *
   * @type {(string | ItemIdValueObject)}
   * @memberof IItemDomainEntity
   */
  itemId?: string | ItemIdValueObject;
  /**
   *  Nombre del Item.
   *
   * @type {(string | NameValueObject)}
   * @memberof IItemDomainEntity
   */
  name?: string | NameValueObject;
  /**
   *  Descripción del Item.
   *
   * @type {(string | DescriptionValueObject)}
   * @memberof IItemDomainEntity
   */
  description?: string | DescriptionValueObject;
  /**
   *  Url de la Imagen del Item.
   *
   * @type {(string | ImageValueObject)}
   * @memberof IItemDomainEntity
   */
  image?: string | ImageValueObject;
  /**
   *  Precio del Item.
   *
   * @type {(number | PriceValueObject)}
   * @memberof IItemDomainEntity
   */
  price?: number | PriceValueObject;
  /**
   * Estado del Item.
   *
   * @type {(boolean | StateValueObject)}
   * @memberof IItemDomainEntity
   */
  state?: boolean | StateValueObject;
  /**
   *  Categorías del Item.
   *
   * @type {(ICategoryDomainEntity[])}
   * @memberof IItemDomainEntity
   */
  categories?: ICategoryDomainEntity[];
  /**
   *  Vendedores del Item.
   *
   * @type {(ISellerDomainEntity)}
   * @memberof IItemDomainEntity
   */
  seller?: ISellerDomainEntity;
}
