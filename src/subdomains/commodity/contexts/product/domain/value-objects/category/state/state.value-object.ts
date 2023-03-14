import { StateValueObjectBase } from '@ValueObjectBase';

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
   *
   * @return {string} retorna el nombre del campo
   * @memberof StateCategoryValueObject
   */
  getFieldName(): string {
    return 'state';
  }
}
