import {
  ItemIdValueObject,
  NameValueObject,
  DescriptionValueObject,
  ImageValueObject,
  PriceValueObject,
  StateValueObject,
} from '../value-objects/item';
import { IItemDomainEntity } from './interfaces/item.domain-entity.interface';
import { SellerDomainEntity } from './seller.domain-entity';
import { CategoryDomainEntity } from './category.domain-entity';

/**
 *  Entidad de Dominio para Item.
 *
 * @export
 * @class ItemDomainEntity
 * @implements {IItemDomainEntity}
 */
export class ItemDomainEntity implements IItemDomainEntity {
  /**
   *  Identificador del Item.
   *
   * @type {(string | ItemIdValueObject)}
   * @memberof ItemDomainEntity
   */
  itemId: string | ItemIdValueObject;
  /**
   *  Nombre del Item.
   *
   * @type {(string | NameValueObject)}
   * @memberof ItemDomainEntity
   */
  name: string | NameValueObject;
  /**
   *  Descripción del Item.
   *
   * @type {(string | DescriptionValueObject)}
   * @memberof ItemDomainEntity
   */
  description: string | DescriptionValueObject;
  /**
   *  Url de la Imagen del Item.
   *
   * @type {(string | ImageValueObject)}
   * @memberof ItemDomainEntity
   */
  image: string | ImageValueObject;
  /**
   *  Precio del Item.
   *
   * @type {(number | PriceValueObject)}
   * @memberof ItemDomainEntity
   */
  price: number | PriceValueObject;
  /**
   *  Estado del Item.
   *
   * @type {(boolean | StateValueObject)}
   * @memberof ItemDomainEntity
   */
  seller: SellerDomainEntity;
  categorys: CategoryDomainEntity[];
  state: boolean | StateValueObject;
  /**
   *  Crea una instancia de ItemDomainEntity.
   * @param {IItemDomainEntity} [data] Datos para inicializar la entidad.
   * @memberof ItemDomainEntity
   */
  constructor(data?: IItemDomainEntity) {
    if (data?.itemId) this.itemId = data.itemId;
    if (data?.name) this.name = data.name;
    if (data?.description) this.description = data.description;
    if (data?.image) this.image = data.image;
    if (data?.price) this.price = data.price;
    if (data?.state) this.state = data.state;
    if (data?.seller) this.seller = data.seller as SellerDomainEntity;
    if (data?.categorys)
      this.categorys = data.categorys as CategoryDomainEntity[];
  }
}
