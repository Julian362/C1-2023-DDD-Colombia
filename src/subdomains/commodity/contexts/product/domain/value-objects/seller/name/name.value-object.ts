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
   * retorna el número mínimo de caracteres
   *
   *
   * @return {number} retorna el número mínimo de caracteres
   * @memberof NameSellerValueObject
   */
  getMinLength(): number {
    return 3;
  }
  /**
   * retorna el número máximo de caracteres
   *
   *
   * @return {number} retorna el número máximo de caracteres
   * @memberof NameSellerValueObject
   */
  getMaxLength(): number {
    return 30;
  }
  /**
   *  retorna el nombre del campo
   *
   *
   * @return {string} nombre del campo
   * @memberof NameSellerValueObject
   */
  getFieldName(): string {
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
