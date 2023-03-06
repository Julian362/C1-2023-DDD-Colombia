import {
  SellerIdValueObject,
  NameValueObject,
  StateValueObject,
} from '../../value-objects/seller';
import { IItemDomainEntity } from './item.domain-entity.interface';
/**
 *  Interface de Dominio para Vendedor.
 *
 * @export
 * @class ISellerDomainEntity
 */
export interface ISellerDomainEntity {
  /**
   *  Identificador del Vendedor.
   *
   * @type {(string | SellerIdValueObject)}
   * @memberof ISellerDomainEntity
   */
  sellerId?: string | SellerIdValueObject;
  /**
   *  Nombre del Vendedor.
   *
   * @type {(string | NameValueObject)}
   * @memberof ISellerDomainEntity
   */
  name?: string | NameValueObject;
  /**
   *  Estado del Vendedor.
   *
   * @type {(boolean | StateValueObject)}
   * @memberof ISellerDomainEntity
   */
  state?: boolean | StateValueObject;
  /**
   *  Items del Vendedor.
   *
   * @type {IItemDomainEntity[]}
   * @memberof ISellerDomainEntity
   */
  items?: IItemDomainEntity[];
}
