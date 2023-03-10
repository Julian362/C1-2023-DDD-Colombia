import { StringValueObjectBase } from '../../../../../../../../shared/domain/value-object/string/string.value-object';
/**
 *  clase que representa el nombre del vendedor
 *
 * @export
 * @class NameSellerValueObject
 * @extends {StringValueObjectBase}
 */
export class NameSellerValueObject extends StringValueObjectBase {
  /**
   *  retorna el nombre del campo
   *
   * @protected
   * @return {string} nombre del campo
   * @memberof NameSellerValueObject
   */
  protected getFieldName(): string {
    return 'name';
  }

  /**
   * crea una instancia de NameSellerValueObject
   * @param {string} value valor del nombre
   * @memberof NameSellerValueObject
   */
  constructor(value: string) {
    super(value);
  }
}
