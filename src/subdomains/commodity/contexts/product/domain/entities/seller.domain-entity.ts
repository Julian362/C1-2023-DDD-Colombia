import {
  SellerIdValueObject,
  NameValueObject,
  StateValueObject,
} from '../value-objects/seller';
import { ISellerDomainEntity } from './interfaces/seller.domain-entity.interface';

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
   *  Estado del Vendedor.
   *
   * @type {(boolean | StateValueObject)}
   * @memberof SellerDomainEntity
   */
  state: boolean | StateValueObject;
  /**
   *  Crea una instancia de SellerDomainEntity.
   * @param {ISellerDomainEntity} [data]
   * @memberof SellerDomainEntity
   */
  constructor(data?: ISellerDomainEntity) {
    if (data?.sellerId) this.sellerId = data.sellerId;
    if (data?.name) this.name = data.name;
    if (data?.state) this.state = data.state;
  }
}
