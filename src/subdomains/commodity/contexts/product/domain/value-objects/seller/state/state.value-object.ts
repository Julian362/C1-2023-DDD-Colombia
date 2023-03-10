import { StateValueObjectBase } from '../../../../../../../../shared/domain/value-object/state/state.value-object';
/**
 * clase que representa el estado del vendedor
 *
 * @export
 * @class StateSellerValueObject
 * @extends {StateValueObjectBase}
 */
export class StateSellerValueObject extends StateValueObjectBase {
  /**
   * retorna el nombre del campo
   *
   * @protected
   * @return {string} nombre del campo
   * @memberof StateSellerValueObject
   */
  protected getFieldName(): string {
    return 'state';
  }

  /**
   * crea una instancia de StateSellerValueObject
   * @param {boolean} value valor del estado
   * @memberof StateSellerValueObject
   */
  constructor(value: boolean) {
    super(value);
  }
}
