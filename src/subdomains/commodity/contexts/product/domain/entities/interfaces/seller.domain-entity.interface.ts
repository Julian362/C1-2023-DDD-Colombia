import {
  SellerIdValueObject,
  NameSellerValueObject,
} from '../../value-objects/seller';
import { IItemDomainEntity } from './item.domain-entity.interface';
import { EmailValueObject } from '../../value-objects/seller/email/email.value-object';
import { StateSellerValueObject } from '../../value-objects/seller/state/state.value-object';
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
   *  Email del Vendedor.
   *
   * @type {(string | EmailValueObject)}
   * @memberof ISellerDomainEntity
   */
  email?: string | EmailValueObject;
  /**
   *  Nombre del Vendedor.
   *
   * @type {(string | NameSellerValueObject)}
   * @memberof ISellerDomainEntity
   */
  name?: string | NameSellerValueObject;
  /**
   *  Estado del Vendedor.
   *
   * @type {(boolean | StateValueObject)}
   * @memberof ISellerDomainEntity
   */
  state?: boolean | StateSellerValueObject;
  /**
   *  Items del Vendedor.
   *
   * @type {IItemDomainEntity[]}
   * @memberof ISellerDomainEntity
   */
  items?: IItemDomainEntity[];
}
