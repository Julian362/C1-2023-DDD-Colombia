import { StateValueObjectBase } from 'src/shared/domain/value-object/state/state.value-object';

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
   * @protected
   * @return {string} nombre del campo
   * @memberof StateValueObject
   */
  protected getFieldName(): string {
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
