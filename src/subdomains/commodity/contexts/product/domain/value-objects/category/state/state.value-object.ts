import { StateValueObjectBase } from 'src/shared/domain/value-object/state/state.value-object';

/**
 *  clase que representa el estado de la categoría
 *
 * @export
 * @class StateValueObject
 * @extends {StateValueObjectBase}
 */
export class StateValueObject extends StateValueObjectBase {
  /**
   *  crea una instancia de StateValueObject
   * @param {boolean} value
   * @memberof StateValueObject
   */
  constructor(value: boolean) {
    super(value);
  }

  /**
   *  retorna el nombre del campo
   *
   * @protected
   * @return {*}  {string}
   * @memberof StateValueObject
   */
  protected getFieldName(): string {
    return 'state';
  }
}
