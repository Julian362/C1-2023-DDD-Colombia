import {
  SellerIdValueObject,
  NameValueObject,
  StateValueObject,
} from '../value-objects/seller';
import { EmailValueObject } from '../value-objects/seller/email';
import { ISellerDomainEntity } from './interfaces/seller.domain-entity.interface';
import { ItemDomainEntity } from './item.domain-entity';

/**
 *  Entidad de Dominio para Vendedor.
 *
 * @export
 * @class SellerDomainEntity
 * @implements {ISellerDomainEntity}
 */
export class SellerDomainEntity implements ISellerDomainEntity {
  /**
   *  Identificador del Vendedor.
   *
   * @type {(string | SellerIdValueObject)}
   * @memberof SellerDomainEntity
   */
  sellerId: string | SellerIdValueObject;
  /**
   *  Nombre del Vendedor.
   *
   * @type {(string | NameValueObject)}
   * @memberof SellerDomainEntity
   */
  name: string | NameValueObject;
  /**
   *  Email del Vendedor.
   *
   * @type {(string | EmailValueObject)}
   * @memberof ISellerDomainEntity
   */
  email: string | EmailValueObject;
  /**
   *  Estado del Vendedor.
   *
   * @type {(boolean | StateValueObject)}
   * @memberof SellerDomainEntity
   */
  state: boolean | StateValueObject;
  items: ItemDomainEntity[];
  /**
   *  Crea una instancia de SellerDomainEntity.
   * @param {ISellerDomainEntity} [data]
   * @memberof SellerDomainEntity
   */
  constructor(data?: ISellerDomainEntity) {
    if (data?.sellerId) this.sellerId = data.sellerId;
    if (data?.email) this.email = data.email;
    if (data?.name) this.name = data.name;
    if (data?.state) this.state = data.state;
    if (data?.items) this.items = data.items as ItemDomainEntity[];
  }
}
