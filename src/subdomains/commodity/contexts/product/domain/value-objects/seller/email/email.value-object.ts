import { UUIDValueObjectBase } from '../../../../../../../../shared/domain/value-object/uuid/uuid.value-object.spec';
/**
 * clase que representa el id del vendedor
 *
 * @export
 * @class SellerIdValueObject
 * @extends {UUIDValueObjectBase}
 */
export class EmailValueObject extends UUIDValueObjectBase {
  /**
   * retorna el nombre del campo
   *
   * @protected
   * @return {*}  {string}
   * @memberof SellerIdValueObject
   */
  protected getFieldName(): string {
    return 'sellerId';
  }
  /**
   *  crea una instancia de SellerIdValueObject
   * @param {string} value
   * @memberof SellerIdValueObject
   */
  constructor(value: string) {
    super(value);
  }
}
