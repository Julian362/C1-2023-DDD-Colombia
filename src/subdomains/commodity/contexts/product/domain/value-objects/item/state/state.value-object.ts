import { StateValueObjectBase } from '@ValueObjectBase';

/**
 *  clase que representa el estado del item
 *
 * @export
 * @class StateValueObject
 * @extends {StateValueObjectBase}
 */
export class StateValueObject extends StateValueObjectBase {
  /**
   *  retorna el nombre del campo
   *
   *
   * @return {string} nombre del campo
   * @memberof StateValueObject
   */
  getFieldName(): string {
    return 'state';
  }
  /**
   *  crea una instancia de StateValueObject
   * @param {boolean} value valor del estado
   * @memberof StateValueObject
   */
  constructor(value: boolean) {
    super(value);
  }
}
