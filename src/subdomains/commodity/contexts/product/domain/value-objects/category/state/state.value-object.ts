import { StateValueObjectBase } from 'src/shared/domain/value-object/state/state.value-object';

/**
 *  clase que representa el estado de la categoría
 *
 * @export
 * @class StateCategoryValueObject
 * @extends {StateValueObjectBase}
 */
export class StateCategoryValueObject extends StateValueObjectBase {
  /**
   *  crea una instancia de StateCategoryValueObject
   * @param {boolean} value valor del estado
   * @memberof StateCategoryValueObject
   */
  constructor(value: boolean) {
    super(value);
  }

  /**
   *  retorna el nombre del campo
   *
   * @protected
   * @return {string} retorna el nombre del campo
   * @memberof StateCategoryValueObject
   */
  protected getFieldName(): string {
    return 'state';
  }
}
