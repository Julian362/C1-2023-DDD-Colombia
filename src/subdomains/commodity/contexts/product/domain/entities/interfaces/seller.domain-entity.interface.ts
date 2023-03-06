import {
  SellerIdValueObject,
  NameValueObject,
  StateValueObject,
} from '../../value-objects/seller';
/**
 *  Interface de Dominio para Vendedor.
 *
 * @export
 * @class ISellerDomainEntity
 */
export class ISellerDomainEntity {
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
}
