import { UUIDValueObjectBase } from '@ValueObjectBase';
import { v4 as uuid } from 'uuid';
/**
 * clase que representa el id del vendedor
 *
 * @export
 * @class SellerIdValueObject
 * @extends {UUIDValueObjectBase}
 */
export class SellerIdValueObject extends UUIDValueObjectBase {
  /**
   * retorna el nombre del campo
   *
   *
   * @return {string} nombre del campo
   * @memberof SellerIdValueObject
   */
  getFieldName(): string {
    return 'sellerId';
  }
  /**
   *  crea una instancia de SellerIdValueObject
   * @param {string} value valor del id del vendedor
   * @memberof SellerIdValueObject
   */
  constructor(value?: string) {
    super(value ? value : uuid());
  }
}
