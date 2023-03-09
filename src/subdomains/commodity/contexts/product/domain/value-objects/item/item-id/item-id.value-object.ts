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
   * @return {string} retorna el nombre del campo
   * @memberof ItemIdValueObject
   */
  protected getFieldName(): string {
    return 'itemId';
  }

  /**
   *  crea una instancia de ItemIdValueObject
   * @param {string} value  valor del id del item
   * @memberof ItemIdValueObject
   */
  constructor(value: string) {
    super(value);
  }
}
