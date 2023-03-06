import { UUIDValueObjectBase } from '../../../../../../../../shared/domain/value-object/uuid/uuid.value-object';

/**
 *  clase que representa el id del item
 *
 * @export
 * @class ItemIdValueObject
 * @extends {StringValueObjectBase}
 */
export class ItemIdValueObject extends UUIDValueObjectBase {
  /**
   *  retorna el nombre del campo
   *
   * @protected
   * @return {*}  {string}
   * @memberof ItemIdValueObject
   */
  protected getFieldName(): string {
    return 'itemId';
  }

  /**
   *  crea una instancia de ItemIdValueObject
   * @param {string} value
   * @memberof ItemIdValueObject
   */
  constructor(value: string) {
    super(value);
  }
}
